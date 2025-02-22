import { Injectable, NotFoundException } from '@nestjs/common';

import { DataSource } from 'typeorm';
import { CreateDocumentDto, UpdateDocumentDto } from './dtos/document.dto';
import { Document } from './entities/document.entity';

@Injectable()
export class DocumentService {
  constructor(private readonly dataSource: DataSource) {}

  async createDocument(
    createDocumentDto: CreateDocumentDto,
    file: Express.Multer.File,
  ): Promise<Document> {
    const document = new Document();
    document.name = createDocumentDto.name;
    document.description = createDocumentDto.description;
    document.filePath = file.path;

    return await this.dataSource.getRepository(Document).save(document);
  }

  async getAllDocuments(): Promise<Document[]> {
    return await this.dataSource.getRepository(Document).find();
  }

  async getDocumentById(id: string): Promise<Document> {
    const document = await this.dataSource.getRepository(Document).findOne({
      where: { id },
    });
    if (!document) {
      throw new NotFoundException(`Document with ID ${id} not found`);
    }
    return document;
  }

  async updateDocument(
    id: string,
    updateDocumentDto: UpdateDocumentDto,
  ): Promise<Document> {
    const documentRepository = this.dataSource.getRepository(Document);
    await documentRepository.update(id, updateDocumentDto);

    return this.getDocumentById(id);
  }

  async deleteDocument(id: string): Promise<void> {
    const documentRepository = this.dataSource.getRepository(Document);
    const result = await documentRepository.delete(id);
    if (result.affected === 0) {
      throw new NotFoundException(`Document with ID ${id} not found`);
    }
  }
}

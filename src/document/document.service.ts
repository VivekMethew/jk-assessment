import { Injectable, NotFoundException } from '@nestjs/common';
import * as path from 'path';
import * as fs from 'fs';
import { DataSource } from 'typeorm';
import { CreateDocumentDto, UpdateDocumentDto } from './dtos/document.dto';
import { Document } from './entities/document.entity';
import { APP_CONFIG } from '../config/constants';

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
    document.url = `${APP_CONFIG.BASE_API_URL}/public/files/${file.filename}`;

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
    file: Express.Multer.File,
  ): Promise<Document> {
    const response = await this.getDocumentById(id);

    const existingFilePath = path.join(
      __dirname,
      '..',
      '..',
      response.filePath,
    );

    if (fs.existsSync(existingFilePath)) {
      fs.unlinkSync(existingFilePath);
      console.log('old file successfully deleted');
    }

    const document = new Document();
    document.name = updateDocumentDto?.name || '';
    document.description = updateDocumentDto?.description || '';
    document.filePath = file.path;
    document.url = `${APP_CONFIG.BASE_API_URL}/public/files/${file.filename}`;

    const documentRepository = this.dataSource.getRepository(Document);
    await documentRepository.update(id, document);

    return this.getDocumentById(id);
  }

  async deleteDocument(id: string): Promise<void> {
    const response = await this.getDocumentById(id);

    const documentRepository = this.dataSource.getRepository(Document);
    const result = await documentRepository.delete(id);
    if (result.affected === 0) {
      throw new NotFoundException(`Document with ID ${id} not found`);
    }

    const existingFilePath = path.join(
      __dirname,
      '..',
      '..',
      response.filePath,
    );

    if (fs.existsSync(existingFilePath)) {
      fs.unlinkSync(existingFilePath);
      console.log('File successfully deleted');
    }
  }
}

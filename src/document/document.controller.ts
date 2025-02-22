import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Delete,
  Put,
  UploadedFile,
  UseInterceptors,
  HttpStatus,
  HttpCode,
} from '@nestjs/common';
import { DocumentService } from './document.service';
import { FileInterceptor } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import {
  ApiBearerAuth,
  ApiOperation,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';
import { CreateDocumentDto, UpdateDocumentDto } from './dtos/document.dto';

@ApiTags('Documents')
@Controller('documents')
export class DocumentController {
  constructor(private readonly documentService: DocumentService) {}

  @Post()
  @ApiOperation({ summary: 'Upload a new document' })
  @HttpCode(HttpStatus.CREATED)
  @UseInterceptors(
    FileInterceptor('file', {
      storage: diskStorage({
        destination: './uploads', // Define the folder where files are stored
        filename: (req, file, cb) => {
          cb(null, `${Date.now()}-${file.originalname}`);
        },
      }),
    }),
  )
  async createDocument(
    @Body() createDocumentDto: CreateDocumentDto,
    @UploadedFile() file: Express.Multer.File,
  ) {
    return this.documentService.createDocument(createDocumentDto, file);
  }

  @Get()
  @ApiOperation({ summary: 'Get all documents' })
  async getAllDocuments() {
    return this.documentService.getAllDocuments();
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get a document by ID' })
  async getDocumentById(@Param('id') id: string) {
    return this.documentService.getDocumentById(id);
  }

  @Put(':id')
  @ApiOperation({ summary: 'Update a document' })
  async updateDocument(
    @Param('id') id: string,
    @Body() updateDocumentDto: UpdateDocumentDto,
  ) {
    return this.documentService.updateDocument(id, updateDocumentDto);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Delete a document' })
  async deleteDocument(@Param('id') id: string) {
    return this.documentService.deleteDocument(id);
  }
}

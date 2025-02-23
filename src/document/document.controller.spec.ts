import { Test, TestingModule } from '@nestjs/testing';
import { DocumentController } from './document.controller';
import { DocumentService } from './document.service';
import { CreateDocumentDto, UpdateDocumentDto } from './dtos/document.dto';
import * as request from 'supertest';
import { INestApplication } from '@nestjs/common';

describe('DocumentController', () => {
  let controller: DocumentController;
  let service: DocumentService;
  let app: INestApplication;

  const mockDocumentService = {
    createDocument: jest.fn(),
    getAllDocuments: jest.fn(),
    getDocumentById: jest.fn(),
    updateDocument: jest.fn(),
    deleteDocument: jest.fn(),
  };

  const mockFile = {
    originalname: 'test.pdf',
    buffer: Buffer.from('dummy data'),
  };

  const mockCreateDocumentDto: CreateDocumentDto = {
    name: 'Test Document',
    description: 'Test Description',
  };

  const mockUpdateDocumentDto: UpdateDocumentDto = {
    name: 'Updated Document',
    description: 'Updated Description',
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [DocumentController],
      providers: [
        {
          provide: DocumentService,
          useValue: mockDocumentService,
        },
      ],
    }).compile();

    controller = module.get<DocumentController>(DocumentController);
    service = module.get<DocumentService>(DocumentService);
    app = module.createNestApplication();
    await app.init();
  });

  afterEach(async () => {
    await app.close();
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  describe('createDocument', () => {
    it('should upload and create a document', async () => {
      const expectedResult = { id: '1', ...mockCreateDocumentDto };

      mockDocumentService.createDocument.mockResolvedValue(expectedResult);

      return request(app.getHttpServer())
        .post('/documents')
        .field('name', mockCreateDocumentDto.name)
        .field('description', mockCreateDocumentDto.description)
        .attach('file', Buffer.from(mockFile.buffer), mockFile.originalname)
        .expect(201)
        .then((response) => {
          expect(response.body).toEqual(expectedResult);
          expect(mockDocumentService.createDocument).toHaveBeenCalledWith(
            mockCreateDocumentDto,
            expect.any(Object),
          );
        });
    });
  });

  describe('getAllDocuments', () => {
    it('should return all documents', async () => {
      const documents = [{ id: '1', ...mockCreateDocumentDto }];
      mockDocumentService.getAllDocuments.mockResolvedValue(documents);

      return request(app.getHttpServer())
        .get('/documents')
        .expect(200)
        .then((response) => {
          expect(response.body).toEqual(documents);
        });
    });
  });

  describe('getDocumentById', () => {
    it('should return a document by ID', async () => {
      const document = { id: '1', ...mockCreateDocumentDto };
      mockDocumentService.getDocumentById.mockResolvedValue(document);

      return request(app.getHttpServer())
        .get('/documents/1')
        .expect(200)
        .then((response) => {
          expect(response.body).toEqual(document);
        });
    });

    it('should return 404 if document is not found', async () => {
      mockDocumentService.getDocumentById.mockResolvedValue(null);

      await request(app.getHttpServer()).get('/documents/99');
      expect(404).toBe(404);
    });
  });

  describe('updateDocument', () => {
    it('should update a document', async () => {
      const updatedDocument = { id: '1', ...mockUpdateDocumentDto };
      mockDocumentService.updateDocument.mockResolvedValue(updatedDocument);

      return request(app.getHttpServer())
        .put('/documents/1')
        .field('name', mockUpdateDocumentDto?.name || '')
        .field('description', mockUpdateDocumentDto?.description || '')
        .attach('file', Buffer.from(mockFile.buffer), mockFile.originalname)
        .expect(200)
        .then((response) => {
          expect(response.body).toEqual(updatedDocument);
          expect(mockDocumentService.updateDocument).toHaveBeenCalledWith(
            '1',
            mockUpdateDocumentDto,
            expect.any(Object), // Expecting the file object
          );
        });
    });
  });

  describe('deleteDocument', () => {
    it('should delete a document', async () => {
      mockDocumentService.deleteDocument.mockResolvedValue(true);

      return request(app.getHttpServer())
        .delete('/documents/1')
        .expect(200)
        .then(() => {
          expect(mockDocumentService.deleteDocument).toHaveBeenCalledWith('1');
        });
    });
  });
});

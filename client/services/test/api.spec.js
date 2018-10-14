import { defer, of, throwError } from 'rxjs';

import http from 'client/services/http';

import {
  fetchDataByGeneName,
  fetchDataByProteinId
} from 'client/services/api';

import BRCA2 from 'test/fixtures/lookup-gene-expanded-response';
import BRAF from 'test/fixtures/lookup-braf-expanded-response';
import multipleProteinSequencesBRCA2 from 'test/fixtures/sequence-protein-multiple-response';
import multipleProteinSequencesBRAF from 'test/fixtures/sequence-protein-multiple-response-braf';
import ENSP00000419060 from 'test/fixtures/lookup-protein-response';
import ENST00000496384 from 'test/fixtures/lookup-transcript-response';

http.get = jest.fn((query) => mockGet(query));

const mockErrorMessage = 'Something went wrong with the request';
const mockErrorResponse = {
  response: {
    error: mockErrorMessage
  }
};

const mockGet = (query) => {
  switch (query) {
    case '/lookup/symbol/homo_sapiens/BRCA2?expand=1':
      return defer(() => of(BRCA2));
    case '/lookup/symbol/homo_sapiens/foo?expand=1':
      return defer(() => throwError(mockErrorResponse));
    case '/lookup/id/ENSP00000419060.2':
      return defer(() => of(ENSP00000419060));
    case '/lookup/id/ENST00000496384':
      return defer(() => of(ENST00000496384));
    case '/lookup/id/ENSG00000157764?expand=1':
      return defer(() => of(BRAF));

    case '/sequence/id/ENSG00000139618?multiple_sequences=1;type=protein':
      return defer(() => of(multipleProteinSequencesBRCA2));
    case '/sequence/id/ENSG00000157764?multiple_sequences=1;type=protein':
      return defer(() => of(multipleProteinSequencesBRAF));
  }
};

describe('api service', () => {

  afterEach(() => {
    jest.clearAllMocks();
  });

  describe('fetchDataByGeneName', () => {

    test('queries correct endpoints and transforms the data appropriately', async () => {
      const actionPayload = {
        gene: 'BRCA2',
        aminoAcid: 'F',
        aminoAcidPosition: 12
      };

      const output = await fetchDataByGeneName(actionPayload)
        .toPromise();

      expect(http.get).toHaveBeenNthCalledWith(1, '/lookup/symbol/homo_sapiens/BRCA2?expand=1');
      expect(http.get).toHaveBeenNthCalledWith(2, '/sequence/id/ENSG00000139618?multiple_sequences=1;type=protein');
      expect(output.transcriptIds).toEqual(['ENST00000380152', 'ENST00000544455']);
    });

    test('returns an error message if the request failed', async () => {
      const actionPayload = {
        gene: 'foo',
        aminoAcid: 'F',
        aminoAcidPosition: 12
      };

      const output = await fetchDataByGeneName(actionPayload)
        .toPromise();

      expect(output.error).toEqual(mockErrorMessage);
    });

  });

  describe('fetchDataByProteinId', () => {

    test('queries correct endpoints and transforms the data appropriately', async () => {
      const actionPayload = {
        sequenceId: 'ENSP00000419060.2',
        initialAminoAcid: 'Val',
        newAminoAcid: 'Glu',
        position: 600
      };

      const output = await fetchDataByProteinId(actionPayload)
        .toPromise();

      expect(http.get).toHaveBeenNthCalledWith(1, '/lookup/id/ENSP00000419060.2'); // requested the protein info
      expect(http.get).toHaveBeenNthCalledWith(2, '/lookup/id/ENST00000496384'); // requested the transcript info
      expect(http.get).toHaveBeenNthCalledWith(3, '/lookup/id/ENSG00000157764?expand=1'); // requested the gene expanded info
      expect(http.get).toHaveBeenNthCalledWith(4, '/sequence/id/ENSG00000157764?multiple_sequences=1;type=protein'); // requested protein sequences encoded by this gene

      expect(output.transcriptIds).toEqual(['ENST00000496384', 'ENST00000646891']);
    });

  });

});

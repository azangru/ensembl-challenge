import React from 'react';
import { shallow, mount } from 'enzyme';

import { parseHgvsSubsctitutionCode } from 'client/helpers/hgvs-helpers';

import SearchFields from '../search-fields';
import PlainSearchFields from '../plain-search-fields';
import HGVSSearchField from '../hgvs-search-field';

const searchByGene = jest.fn();
const searchByProtein = jest.fn();

describe('SearchFields component', () => {

  test('renders without error', () => {
    expect(() => shallow(
      <SearchFields
        searchByGene={searchByGene}
        searchByProtein={searchByProtein}
      />
    )).not.toThrow();
  });

});

describe('PlainSearchFields', () => {

  test('renders without error', () => {
    expect(() => shallow(
      <PlainSearchFields
        onSearch={searchByGene}
      />
    )).not.toThrow();
  });

  describe('filling in the form', () => {

    let wrapper, geneField, positionField, aminoAcidField;

    beforeEach(() => {
      wrapper = mount(<PlainSearchFields onSearch={searchByGene} />);
      geneField = wrapper.find('input[name="gene-symbol"]');
      positionField = wrapper.find('input[name="amino-acid-position"]');
      aminoAcidField = wrapper.find('input[name="amino-acid"]');
    });

    afterEach(() => {
      jest.resetAllMocks();
    });

    test('calls onSearch only when all fields are filled in', () => {
      geneField.simulate('change', { target: { value: 'BRAF' } });
      positionField.simulate('change', { target: { value: '600' } });
      aminoAcidField.simulate('change', { target: { value: 'V' } });

      expect(searchByGene).toHaveBeenCalledTimes(1);
      expect(searchByGene).toHaveBeenCalledWith({ gene: 'BRAF', aminoAcid: 'V', aminoAcidPosition: 600 });
    });

    test('calls onSearch with a new payload if a field value is changed', () => {
      geneField.simulate('change', { target: { value: 'BRAF' } });
      positionField.simulate('change', { target: { value: '600' } });
      aminoAcidField.simulate('change', { target: { value: 'V' } });

      geneField.simulate('change', { target: { value: 'BRA' } });

      const firstExpectedPayload = {
        gene: 'BRAF',
        aminoAcid: 'V',
        aminoAcidPosition: 600
      };

      const secondExpectedPayload = {
        gene: 'BRA',
        aminoAcid: 'V',
        aminoAcidPosition: 600
      };

      expect(searchByGene).toHaveBeenCalledTimes(2);
      expect(searchByGene).toHaveBeenNthCalledWith(1, firstExpectedPayload);
      expect(searchByGene).toHaveBeenNthCalledWith(2, secondExpectedPayload);
    });

  });

});

describe('HGVSSearchField', () => {

  afterEach(() => {
    jest.resetAllMocks();
  });

  test('renders without error', () => {
    expect(() => shallow(
      <HGVSSearchField
        onSearch={searchByProtein}
      />
    )).not.toThrow();
  });

  describe('filling in the form', () => {

    let wrapper, searchField;

    beforeEach(() => {
      wrapper = mount(<HGVSSearchField onSearch={searchByProtein} />);
      searchField = wrapper.find('input[name="hgvs-substitution"]');
    });

    afterEach(() => {
      jest.resetAllMocks();
    });

    test('calls onSearch only when the query is written in a valid form', () => {
      const invalidQuery = 'ENSP00000419060.2:p.Val600Gl'; // missing a letter in the end
      const validQuery = 'ENSP00000419060.2:p.Val600Glu';
      searchField.simulate('change', { target: { value: invalidQuery } });

      expect(searchByProtein).not.toHaveBeenCalled();

      searchField.simulate('change', { target: { value: validQuery } });

      expect(searchByProtein).toHaveBeenCalled();
      expect(searchByProtein).toHaveBeenCalledWith(parseHgvsSubsctitutionCode(validQuery));
    });

  });

});

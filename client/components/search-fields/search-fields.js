// @flow

import React, { PureComponent } from 'react';
import classNames from 'classnames';

import PlainSearchFields from './plain-search-fields';
import HGVSSearchField from './hgvs-search-field';

import './search-fields.styl';

type Props = {
  searchByGene: Function,
  searchByProtein: Function
};

type View = 'gene' | 'protein';

type State = {
  view: View
};

class SearchFields extends PureComponent<Props, State> {

  state = {
    view: 'gene'
  }

  switchViewTo = (view: View) => () => {
    this.setState({ view });
  }

  getNavItemClassFor(item: View) {
    return classNames(
      'search-fields__navigation-item',
      {
        'search-fields__navigation-item_active': item === this.state.view
      }
    );
  }

  render() {
    return (
      <div>
        { this.renderTitle() }
        { this.renderNav() }
        { this.state.view === 'gene' &&
          <PlainSearchFields onSearch={this.props.searchByGene} />
        }
        { this.state.view === 'protein' &&
          <HGVSSearchField onSearch={this.props.searchByProtein} />
        }
      </div>
    );
  }

  renderTitle() {
    return (
      <h1>
        Search for gene transcripts
      </h1>
    );
  }

  renderNav() {
    return (
      <nav className="search-fields__navigation">
        <span
          className={this.getNavItemClassFor('gene')}
          onClick={this.switchViewTo('gene')}
        >
          By gene name
        </span>
        <span
          className={this.getNavItemClassFor('protein')}
          onClick={this.switchViewTo('protein')}
        >
          By amino acid substitution
        </span>
      </nav>
    );
  }

}

export default SearchFields;

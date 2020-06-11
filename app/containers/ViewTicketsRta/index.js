/**
 *
 * ViewTicketsRta
 *
 */

import React from 'react';
import { Helmet } from 'react-helmet';
import brand from 'dan-api/dummy/brand';
import { PapperBlock } from 'dan-components';
import TicketData from '../TicketDataRta/index';

/* eslint-disable react/prefer-stateless-function */
export class ViewTicketsRta extends React.Component {
  render() {
    const title = brand.name + ' - Ticket Data';
    const description = brand.desc;
    return (
      <div>
        <Helmet>
          <title>{title}</title>
          <meta name="description" content={description} />
          <meta property="og:title" content={title} />
          <meta property="og:description" content={description} />
          <meta property="twitter:title" content={title} />
          <meta property="twitter:description" content={description} />
        </Helmet>
        <PapperBlock title="Ticket Data" whiteBg icon="ios-menu-outline">
          <div>
            <TicketData />
          </div>
        </PapperBlock>
      </div>
    );
  }
}

export default ViewTicketsRta;

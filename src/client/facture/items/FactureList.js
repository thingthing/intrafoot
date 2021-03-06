import React from 'react';
import { array, func, shape } from 'prop-types';
import { Link } from 'react-router-dom';
import {
  Table,
  TableHeader,
  Cell,
  Card,
  CardTitle,
  CardText,
  CardActions,
  Button
} from 'react-mdl';
import moment from 'moment';

import Projects from '../../../common/project/projectSchema';
import Devis from '../../../common/devis/devisSchema';

const FactureList = ({ factures, renderAction, history, ...otherProps }) =>
  <Cell col={12} component={Card} shadow={0}>
    <CardTitle>Factures</CardTitle>
    <CardText>
      <Table
        sortable
        rowKeyColumn="id"
        shadow={0}
        rows={factures}
        {...otherProps}
      >
        <TableHeader name="id" tooltip="Identifiant de la facture">
          Identifiant
        </TableHeader>
        <TableHeader
          name="idProject"
          tooltip="Projet lié à la facture"
          cellFormatter={id => {
            const project = Projects.findOne(id);
            return (
              <Link to={`/project/${id}`}>
                {project.name}
              </Link>
            );
          }}
        >
          Projet
        </TableHeader>
        <TableHeader
          name="idDevis"
          tooltip="Devis lié à la facture"
          cellFormatter={id => {
            const devis = Devis.findOne(id);
            if (!devis) return '';
            return (
              <Link to={`/devis/${id}`}>
                {devis.id}
              </Link>
            );
          }}
        >
          Devis
        </TableHeader>
        <TableHeader name="price" tooltip="Prix de la facture">
          Prix
        </TableHeader>
        <TableHeader
          name="sentDate"
          tooltip="Date d'envoi de la facture"
          cellFormatter={date => date && moment(date).format('LL')}
        >
          Envoyé le
        </TableHeader>
        <TableHeader
          name="payed"
          tooltip="Est-ce que la facture est réglée?"
          cellFormatter={payed => {
            switch (payed) {
              case 'annulé':
                return 'Annulé';
              case 'true':
                return 'Oui';
              default:
              case 'false':
                return 'Non';
            }
          }}
        >
          Réglée?
        </TableHeader>
        <TableHeader
          name="pricePayed"
          tooltip="La somme qui a été reçu pour cette facture"
        >
          Versement
        </TableHeader>
        <TableHeader
          name="delayTillPayed"
          tooltip="Nombre de jour maximum avant le règlement"
        >
          Délai de règlement
        </TableHeader>
        <TableHeader name="remarque" tooltip="Remarque">
          Remarque
        </TableHeader>
        <TableHeader
          name="payedDate"
          tooltip="Date de reçu du règlement de la facture"
          cellFormatter={date => date && moment(date).format('LL')}
        >
          Date de règlement
        </TableHeader>
        <TableHeader name="action" cellFormatter={renderAction}>
          Actions
        </TableHeader>
      </Table>
    </CardText>
    <CardActions border>
      <Button
        colored
        ripple
        onClick={() => {
          history.push('/facture/add');
          return false;
        }}
      >
        Ajouter une facture
      </Button>
    </CardActions>
  </Cell>;

FactureList.propTypes = {
  factures: array.isRequired,
  renderAction: func.isRequired,
  history: shape({
    replace: func.isRequired,
    push: func.isRequired
  }).isRequired
};

export default FactureList;

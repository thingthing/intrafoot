import { Tracker } from 'meteor/tracker';
import Devis from '../../common/devis/devisSchema';

export function addDevis(data, callback) {
  return () => {
    Meteor.call('addDevis', data, callback);
  };
}

export function deleteDevis(id) {
  return () => {
    Meteor.call('deleteDevis', id);
  };
}

export function editDevis(data, callback) {
  return () => {
    Meteor.call('editDevis', data, callback);
  };
}

export function loadDevis() {
  return dispatch => {
    Tracker.autorun(() => {
      dispatch({
        type: 'SET_DEVIS',
        devis: Devis.find({}, { sort: { createdAt: -1 } }).fetch() || []
      });
    });
  };
}

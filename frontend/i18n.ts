/*
 *
 *   OSIS stands for Open Student Information System. It's an application
 *   designed to manage the core business of higher education institutions,
 *   such as universities, faculties, institutes and professional schools.
 *   The core business involves the administration of students, teachers,
 *   courses, programs and so on.
 *
 *   Copyright (C) 2015-2021 Université catholique de Louvain (http://www.uclouvain.be)
 *
 *   This program is free software: you can redistribute it and/or modify
 *   it under the terms of the GNU General Public License as published by
 *   the Free Software Foundation, either version 3 of the License, or
 *   (at your option) any later version.
 *
 *   This program is distributed in the hope that it will be useful,
 *   but WITHOUT ANY WARRANTY; without even the implied warranty of
 *   MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
 *   GNU General Public License for more details.
 *
 *   A copy of this license - GNU General Public License - is available
 *   at the root of the source code of this program.  If not,
 *   see http://www.gnu.org/licenses/.
 *
 */
import {createI18n} from 'vue-i18n';

const messages = {
  en: {
    thread: {
      title: "Comments",
      add_comment: "Add comment",
      previous: "Previous page",
      next: "Next page",
      sort: "sort",
    },
    entry: {
      anonymous: 'Anonymous',
      authored_date: 'on {date} at {time}',
      edit_comment: 'Edit',
      submit_comment: "Submit",
      delete_comment: 'Delete',
      cancel_edit: 'Annuler',
      placeholder: "Your comment",
    },
    error: 'Error: {error}',
    request_error: "Request error: {error}",
  },
  'fr-be': {
    thread: {
      title: 'Commentaires',
      add_comment: "Ajouter un commentaire",
      previous: "Page précédente",
      next: "Page suivante",
      sort: "trier",
    },
    entry: {
      anonymous: 'Anonyme',
      authored_date: 'le {date} à {time}',
      edit_comment: 'Modifier',
      submit_comment: "Soumettre",
      delete_comment: 'Supprimer',
      cancel_edit: 'Annuler',
      placeholder: "Votre commentaire",
    },
    error: 'Erreur: {error}',
    request_error: "Erreur HTTP: {error}",
  },
};

export const i18n = createI18n({
  locale: document.documentElement.lang || 'en',
  messages,
});

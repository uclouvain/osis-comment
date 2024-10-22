<!--
  -
  - OSIS stands for Open Student Information System. It's an application
  - designed to manage the core business of higher education institutions,
  - such as universities, faculties, institutes and professional schools.
  - The core business involves the administration of students, teachers,
  - courses, programs and so on.
  -
  - Copyright (C) 2015-2023 Université catholique de Louvain (http://www.uclouvain.be)
  -
  - This program is free software: you can redistribute it and/or modify
  - it under the terms of the GNU General Public License as published by
  - the Free Software Foundation, either version 3 of the License, or
  - (at your option) any later version.
  -
  - This program is distributed in the hope that it will be useful,
  - but WITHOUT ANY WARRANTY; without even the implied warranty of
  - MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
  - GNU General Public License for more details.
  -
  - A copy of this license - GNU General Public License - is available
  - at the root of the source code of this program.  If not,
  - see http://www.gnu.org/licenses/.
  -
  -->

<template>
  <div
      class="comment-panel panel border border-primary mb-4 rounded-top d-flex flex-column"
      :class="`panel-${panelClass} card-${panelClass}`"
  >
    <div class="panel-heading clearfix bg-primary text-white">
      {{ headerTitle || $t('thread.title') }}
      <template v-if="total != null && !singleMode">
        ({{ total }})
      </template>
      <button
          v-if="!singleMode"
          class="btn btn-default p-2 px-3 btn-sm pull-right float-end"
          @click="changeSort()"
      >
        {{ $t('thread.sort') }}
        <i
            class="fas"
            :class="isAscendedSort ? 'fa-sort-up' : 'fa-sort-down'"
        />
      </button>
    </div>
    <span
        v-if="loading"
        class="spinner"
    />
    <div
        v-if="error"
        class="panel-body card-body pb-0 text-danger"
    >
      {{ error }}
    </div>
    <CommentEntry
        v-for="entry in entries"
        v-else
        :key="entry.uuid"
        :entry="entry"
        :rich-text-config="richTextConfig"
        :with-last-update-by-prefix="singleMode"
        @edit="editEntry"
        @delete="deleteEntry"
    />
    <div
        v-if="nextPage || previousPage || createUrl"
        class="panel-body card-body pb-3"
    >
      <button
          v-if="previousPage && !singleMode"
          class="btn btn-sm btn-default"
          @click="previousPage && (currentUrl = previousPage); loadEntries()"
      >
        <i class="fas fa-chevron-left" />
        {{ $t('thread.previous') }}
      </button>
      <button
          v-if="nextPage && !singleMode"
          class="btn btn-sm btn-default"
          @click="nextPage && (currentUrl = nextPage); loadEntries()"
      >
        {{ $t('thread.next') }}
        <i class="fas fa-chevron-right" />
      </button>
      <template v-if="createUrl">
        <button
            v-if="!isAdding"
            class="btn btn-sm p-2 btn-primary pull-right float-end fs-7"
            @click="isAdding = !isAdding"
        >
          <i class="fas fa-plus" />
          {{ $t('thread.add_comment') }}
        </button>
        <CommentEditor
            v-else
            :rich-text-config="richTextConfig"
            @submit="createEntry"
            @cancel="isAdding = !isAdding"
        />
      </template>
    </div>
  </div>
</template>

<script lang="ts">
import CommentEntry from './components/CommentEntry.vue';
import {Entry} from './types';
import type {EntriesResponse} from './interfaces';
import CommentEditor from './components/CommentEditor.vue';
import type {PropType} from "vue";
import EventBus from './event-bus';
import {defineComponent} from "vue";

export default defineComponent({
  name: 'CommentViewer',
  components: {CommentEditor, CommentEntry},
  props: {
    url: {
      type: String,
      required: true,
    },
    tags: {
      type: Array as PropType<string[]>,
      default: () => [],
    },
    headerTitle: {
      type: String,
      default: '',
    },
    pageSize: {
      type: Number,
      default: 10,
    },
    defaultSort: {
      type: String,
      default: '-modified_at',
    },
    panelClass: {
      type: String,
      default: 'default',
    },
    richTextConfig: {
      type: Object,
      default: () => undefined,
    },
    singleMode: {
      type: Boolean,
      default: true,
    },
  },
  data() {
    const params = new URLSearchParams(this.singleMode
        ? {
          last: '1',
        }
        : {
          limit: String(this.pageSize),
          sort: '-modified_at',
        },
    );
    if (this.tags.length) {
      params.append('tags', this.tags.join(','));
    }
    const element = document.querySelector('[name=csrfmiddlewaretoken]');
    if (!(element instanceof HTMLInputElement)) {
      throw new Error('Please include {% csrf_token %} in your page.');
    }
    return {
      entries: [] as Entry[],
      error: '',
      total: null as number | null,
      createUrl: null as string | null,
      currentUrl: `${this.url}?${params.toString()}`,
      currentSort: '-modified_at',
      previousPage: null as string | null,
      nextPage: null as string | null,
      loading: true,
      isAdding: false,
      csrfToken: element.value,
    };
  },
  computed: {
    isAscendedSort: function (): boolean {
      return this.currentSort === 'modified_at';
    },
  },
  mounted() {
    void this.loadEntries();
  },
  methods: {
    async changeSort() {
      const url = new URL(window.location.origin + this.currentUrl);
      const params = new URLSearchParams(url.search);
      this.currentSort = this.isAscendedSort ? '-modified_at' : 'modified_at';
      params.set('sort', this.currentSort);
      this.currentUrl = `${url.pathname}?${params.toString()}`;
      await this.loadEntries();
    },
    async loadEntries() {
      const data = (await this.doRequest(this.currentUrl, {}, false)) as EntriesResponse;
      if (data) {
        this.createUrl = typeof data.create === 'string' && (!this.singleMode || data.results.length === 0) ? data.create : null;
        this.previousPage = data.previous;
        this.nextPage = data.next;
        this.total = data.count;
        this.entries = data.results.map(r => new Entry(r));
      }
    },
    async createEntry(value: string) {
      await this.doRequest(this.createUrl as string, {
        method: 'POST',
        body: JSON.stringify({comment: value, tags: this.tags}),
      });
      this.isAdding = false;
    },
    async editEntry(url: string, value: string, callback: () => void) {
      await this.doRequest(url, {
        method: 'PUT',
        body: JSON.stringify({comment: value}),
      }).then(callback);
    },
    async deleteEntry(url: string) {
      await this.doRequest(url, {method: 'DELETE'});
    },
    async doRequest(url: string, params: object, refresh = true) {
      this.loading = true;
      this.error = '';
      try {
        const response = await fetch(url, {
          mode: 'same-origin',
          headers: {
            'Content-Type': 'application/json;charset=utf-8',
            'X-CSRFToken': this.csrfToken,
          },
          ...params,
        });
        if (response.status >= 200 && response.status < 300) {
          if (refresh) {
            await this.loadEntries();
            EventBus.emit("REFRESH_COMMENTS_EVENT");
          }
          this.loading = false;
          return response.json();
        } else {
          this.error = response.statusText;
        }
      } catch (e) {
        this.error = (e as Error).message;
      }
      this.loading = false;
    },
  },
});
</script>

<style>
.comment-panel .panel-heading {
  line-height: 30px;
}
</style>

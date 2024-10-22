# OSIS Comment

`OSIS Comment` is a Django application to add comments on objects. It embeds a comment listing/editing API 
and goes along with a VueJS widget that permit the comment visualization/edition.

Requirements
============

- `OSIS Comment` requires `Django Framework` 2.2.0

How to install ?
================

## For production

```bash
# From your osis install, with python environment activated
pip install git+https://github.com/uclouvain/osis-comment.git@dev#egg=osis_comment
```

## For development

```bash
# From your osis install, with python environment activated
git clone git@github.com:uclouvain/osis-comment.git
pip install -e ./osis-comment
```

Configuring Django
------------------

Add ``osis_comment`` to ``INSTALLED_APPS``:

```python
INSTALLED_APPS = (
    ...,
    'osis_comment',
    ...,
)
```

Using OSIS-Comment
==================
osis_comment is a small utility package that allows user to comment on objects within a Django application.

This object's comment is then exposed via a UX-friendly widget that allows viewing, adding, editing and deleting comments.

Prepare your classes
--------------------

Before being able to create comment entries, you will need to prepare your model classes.

To do so, just add the `CommentDeleteMixin` to the classes that will have comments on their objects instances ;

- Import and declare the mixin :

```python
from django.db import models
from osis_comment.models import CommentDeleteMixin
 
class MyClass(CommentDeleteMixin, models.Model):
    ...
```

Add an API View for an object's comments
----------------------------------------

To add CRUD behavior on a given object, you must implement an API view that will be called by the widget,
you are free to put any view permission on it. As for the add, edit and delete, you can override the methods as you wish,
by default all permissions are allowed:

```python
# In your views
from osis_comment.contrib.mixins import CommentEntryAPIMixin
from osis_role.contrib.views import PermissionRequiredMixin


class MyModuleCommentView(CommentEntryAPIMixin):
  def has_add_permission(self):
    return False

  def has_change_permission(self, comment):
    return self.request.user.person == comment.author

  def has_delete_permission(self, comment):
    return self.request.user.person == comment.author


# In your urls
from django.urls import path

urlpatterns = [
  path("<uuid:uuid>/", MyModuleCommentView.as_view(), name="some-test"),
]
```

Then to render the widget for an object, include the CSS and JS file while adding a :
- `div.comment-viewer` element to your DOM if you want to display one comment (simple view).
- `div.comment-thread-viewer` element to your DOM if you want to display a paginated list of all comments (thread view).

```html
{% block style %}
  <link href="{% static 'osis_comment/osis-comment.css' %}" rel="stylesheet"/>
{% endblock style %}

{% block content %}
  <!-- Simple view -->
  <div class="comment-viewer" data-url="{% url 'some-test' object.uuid %}"></div>
  <!-- Thread view -->
  <div class="comment-thread-viewer" data-url="{% url 'some-test' object.uuid %}"></div>
{% endblock %}

{% block script %}
  <script type="text/javascript" src="https://unpkg.com/vue@2/dist/vue.min.js"></script>
  <script type="text/javascript" src="https://unpkg.com/vue-i18n@8.24.4/dist/vue-i18n.min.js"></script>
  <script type="text/javascript" src="{% static 'osis_comment/osis-comment.umd.min.js' %}"></script>
{% endblock %}
```

### HTML data-attribute options

- You can filter based on tags by providing the data attribute with comma-separated values: `data-tags="foo,bar"`
- You can customize the header title with `data-header-title="Custom title"`
- You can change the default sort by setting `data-default-sort="created"`
- You can customize the color by setting `data-panel-class="panel panel-info"`
- You can allow HTML through CKEditor by providing a config `data-rich-text-config="{{ config|tojson }}"` 
(you will need to also include the ckeditor script tag)
- You can set the number of comments displayed with `data-page-size="3"`

Contributing to OSIS-Comment
============================

To contribute to the frontend part of this module, install `npm` > 6 (included in [https://nodejs.org/en/download/](nodejs)), and run:
```shell
cd osis_comment
npm clean-install
npm run build
```

Commands available:
- `npm run build` builds the frontend component to `osis_comment/static/osis_comment`
- `npm run watch` builds the frontend component to `osis_comment/static/osis_comment` and watch for file changes (warning: this not a hot-reload, you have to refresh your page)
- `npm run storybook` serve user stories page for development
- `npm run lint` checks Javascript syntax
- `npm run test` launch tests
- `npm run coverage` launch tests with coverage

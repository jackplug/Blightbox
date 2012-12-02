Blightbox - A simple image lightbox for Twitter Bootstrap
=========================================================

I needed a simple lightbox that blends with the Twitter Bootstrap elements. Blightbox is exactly that. It uses jQuery and Bootstrap (including the Bootstrap Modal javascript). Currently it supports single / multiple images and left / right keyboard bindings.

Usage
-----

Just include the Javascript and CSS in your HTML-document. Link directory to the full-size image. Specify the *data-blightbox* attribute and, optionally, a *relation attribute* and a *title attribute*. Images will be grouped by their relation attribute.

```html
<a href="full-size-image.jpg" data-blightbox="blightbox" rel="single-gallery-id" title="Image title">
	<img src="thumb-size-image.jpg" />
</a>
```
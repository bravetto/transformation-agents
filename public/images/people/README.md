# Person Profile Images

This directory contains profile images for all people featured in the Transformation Agents platform.

## Directory Structure

- `full/` - Contains high-resolution images (600×800px) for detailed views and hero sections
- `display/` - Contains medium-resolution images (300×400px) for cards and general display
- `thumbnails/` - Contains small-resolution images (150×200px) for thumbnails and lists

## Image Guidelines

1. **Aspect Ratio**: All images should maintain a 3:4 aspect ratio
2. **Format**: Use WebP format with JPEG fallback
3. **Naming**: Name files to match the person's ID/slug in the data files
4. **Quality**: Optimize images for web while maintaining quality
5. **Consistency**: Use consistent framing across all profile images

## Adding New Images

See the documentation in `docs/image-handling.md` for complete instructions on adding new images and generating blur placeholders.

## Example:

For a person with ID `michael-mataluni`:

```
full/michael-mataluni.webp
display/michael-mataluni.webp 
thumbnails/michael-mataluni.webp
```

After adding images, run:

```
npm run generate-blur
```

Then update the person data file to use `localImage: true`. 
# Image Handling Guide

This guide explains how images are handled in the Transformation Agents project, particularly for person profile images.

## Image Directory Structure

The project uses a structured approach to image storage with different sizes for different use cases:

```
public/
  images/
    people/
      full/         # 600x800px images for detailed views
      display/      # 300x400px images for cards and medium displays
      thumbnails/   # 150x200px images for smaller displays
```

## Image Formats and Aspect Ratio

- All person images should have a **3:4 aspect ratio** (e.g., 300x400px)
- Preferred format is **WebP** with JPEG fallback
- Use consistent portrait framing for all people

## Adding New Person Images

1. **Prepare the images** in the three required sizes:
   - Full: 600x800px
   - Display: 300x400px
   - Thumbnail: 150x200px

2. **Add images** to the corresponding directories:
   ```
   public/images/people/full/person-name.webp
   public/images/people/display/person-name.webp
   public/images/people/thumbnails/person-name.webp
   ```

3. **Generate blur placeholders** by running:
   ```
   npm run generate-blur
   ```

4. **Update the image mappings** in `src/data/person-images.ts`:
   ```typescript
   import blurData from './blur-data.json';

   // Add new entry to personImages
   const personImages: PersonImageMapping = {
     // ... existing entries
     'person-id': {
       full: '/images/people/full/person-name.webp',
       display: '/images/people/display/person-name.webp',
       thumbnail: '/images/people/thumbnails/person-name.webp',
       blurDataURL: blurData['person-name']?.blurDataURL || staticBlurPlaceholders.default
     }
   };
   ```

5. **Update the person data** to use local images:
   ```typescript
   // In person data file (e.g., src/data/people/person-name.ts)
   export const personData: PersonData = {
     // ... other person data
     localImage: true,
     // You can still keep heroImage for fallback/external use
     heroImage: 'https://example.com/image.jpg',
   };
   ```

## How Images are Loaded

The system uses a fallback approach to ensure images always display:

1. First, it tries to load the local image from the person-images mapping
2. If not found, it attempts to load the remote URL specified in heroImage
3. If both fail, it displays a role-based avatar with the person's initials

## Blur Placeholders

Blur placeholders provide a low-resolution preview of the image while the full version loads. This gives a better user experience with progressive loading.

The placeholders are generated as tiny (10x10px) base64-encoded images and stored with the image mappings.

## Image Optimization with Next.js

The project leverages Next.js Image component and optimization features:

- Automatic WebP/AVIF format serving when supported by the browser
- Responsive image sizing based on viewport
- Lazy loading with blur placeholders
- Image dimensions preserved to prevent layout shift

## Best Practices

1. **Use consistent naming**: Name image files the same as the person's ID/slug
2. **Optimize all images**: Compress images before adding to the repository
3. **Use WebP format**: Provides better compression with high quality
4. **Update all three sizes**: Always provide all three image sizes
5. **Run the blur generator**: Always run the generator after adding new images

## Troubleshooting

- **Images not displaying**: Check that the file paths in the mapping match the actual files
- **Blur placeholders not working**: Ensure the blur data is correctly generated and imported
- **Images appear stretched**: Verify the aspect ratio is 3:4 for all images
- **Fallback avatar showing**: Check that `localImage` is set to `true` in the person data 
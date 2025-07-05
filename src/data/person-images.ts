/**
 * Person Image Mapping System
 * 
 * This file contains mappings of person IDs to their local image paths and blur data URLs.
 * Format: { personId: { full, display, thumbnail, fullJpg, displayJpg, thumbnailJpg, blurDataURL } }
 * 
 * - full: 600x800px WebP images for detailed views
 * - display: 300x400px WebP images for cards and medium displays
 * - thumbnail: 150x200px WebP images for smaller displays
 * - fullJpg, displayJpg, thumbnailJpg: JPG fallbacks for browsers without WebP support
 * - blurDataURL: Base64 encoded tiny preview for progressive loading
 */

export interface PersonImageData {
  // WebP versions (primary format)
  full: string;
  display: string;
  thumbnail: string;
  
  // JPG fallbacks for browsers without WebP support
  fullJpg: string;
  displayJpg: string;
  thumbnailJpg: string;
  
  // Blur data URL for progressive loading
  blurDataURL?: string;
}

export type PersonImageMapping = Record<string, PersonImageData>;

/**
 * Static blur data URLs for image placeholders
 * These are tiny base64-encoded images that provide a color preview
 * while the full image loads
 */
export const staticBlurPlaceholders = {
  lightworker: 'data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wBDAAMCAgICAgMCAgIDAwMDBAYEBAQEBAgGBgUGCQgKCgkICQkKDA8MCgsOCwkJDRENDg8QEBEQCgwSExIQEw8QEBD/2wBDAQMDAwQDBAgEBAgQCwkLEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBD/wAARCAAKAAoDASIAAhEBAxEB/8QAFQABAQAAAAAAAAAAAAAAAAAAAAf/xAAgEAABBAICAwEAAAAAAAAAAAABAAIDBAURBiESFZEU/8QAFQEBAQAAAAAAAAAAAAAAAAAAAAX/xAAZEQACAwEAAAAAAAAAAAAAAAAAAQIDERL/2gAMAwEAAhEDEQA/ALzxXCOL8fxdaLGY2CGzG1jZ7JjJK8ucAS5znEknz336A67DLF1R4f6S2OcCZXVsVrXSvp8Mv0PxpNJRY2rRn//Z',
  messenger: 'data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wBDAAMCAgICAgMCAgIDAwMDBAYEBAQEBAgGBgUGCQgKCgkICQkKDA8MCgsOCwkJDRENDg8QEBEQCgwSExIQEw8QEBD/2wBDAQMDAwQDBAgEBAgQCwkLEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBD/wAARCAAKAAoDASIAAhEBAxEB/8QAFQABAQAAAAAAAAAAAAAAAAAAAAf/xAAhEAABBAEDBQAAAAAAAAAAAAABAAIDBQQQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBD/wAARCAAKAAoDASIAAhEBAxEB/8QAFQABAQAAAAAAAAAAAAAAAAAAAAf/xAAhEAABAwQCAwEAAAAAAAAAAAABAAIDBQQRBhITISIxUf/EABUBAQEAAAAAAAAAAAAAAAAAAAUG/8QAGhEAAgMBAQAAAAAAAAAAAAAAAAEDAgQREv/aAAwDAQACEQMRAD8At/D9HdbZdhFrL7cXRYnXY45Y6ske2Z8bXBzWkbAtIIO3voiLF1F4fcb9I1nqJXMgbJVNcykS5/buD3OJO58gEbKVFFLY2rRn/9k=',
  witness: 'data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wBDAAMCAgICAgMCAgIDAwMDBAYEBAQEBAgGBgUGCQgKCgkICQkKDA8MCgsOCwkJDRENDg8QEBEQCgwSExIQEw8QEBD/2wBDAQMDAwQDBAgEBAgQCwkLEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBD/wAARCAAKAAoDASIAAhEBAxEB/8QAFQABAQAAAAAAAAAAAAAAAAAAAAf/xAAhEAABAwQCAwEAAAAAAAAAAAABAAIDBQQGESEHEhMiMf/EABUBAQEAAAAAAAAAAAAAAAAAAAUG/8QAGhEAAgMBAQAAAAAAAAAAAAAAAAECAxESIf/aAAwDAQACEQMRAD8Atnw/F75j1gii/HW3O5UtE1kNPPVSuex8YIBIBJG3HQJ+lJbbhVLFVZ/dpb9PZbNFdKqaSpkuXnI+q8nESC4na3YdHxHrtPVFFLY2rRn/9k=',
  guardian: 'data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wBDAAMCAgICAgMCAgIDAwMDBAYEBAQEBAgGBgUGCQgKCgkICQkKDA8MCgsOCwkJDRENDg8QEBEQCgwSExIQEw8QEBD/2wBDAQMDAwQDBAgEBAgQCwkLEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBD/wAARCAAKAAoDASIAAhEBAxEB/8QAFQABAQAAAAAAAAAAAAAAAAAAAAf/xAAiEAABBAEDBQEAAAAAAAAAAAABAAIDBQQRBgchEhMiMVH/xAAVAQEBAAAAAAAAAAAAAAAAAAAFBv/EABoRAAIDAQEAAAAAAAAAAAAAAAABAgMREiH/2gAMAwEAAhEDEQA/ALzxHR/W2I4TaxC3F0mJV2OOSOSyR75nxtcHNaRsC0gg7e+iIsIuYvCfTdaaiVzIGyVTXMpEuf27g9ziTufIBG/lFFLY2rRnP//Z',
  default: 'data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wBDAAMCAgICAgMCAgIDAwMDBAYEBAQEBAgGBgUGCQgKCgkICQkKDA8MCgsOCwkJDRENDg8QEBEQCgwSExIQEw8QEBD/2wBDAQMDAwQDBAgEBAgQCwkLEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBD/wAARCAAKAAoDASIAAhEBAxEB/8QAFQABAQAAAAAAAAAAAAAAAAAAAAf/xAAiEAABBAEDBQEAAAAAAAAAAAABAAIDBQQGESEHEhMiMTL/xAAVAQEBAAAAAAAAAAAAAAAAAAADBf/EABoRAAIDAQEAAAAAAAAAAAAAAAABAhEDBBL/2gAMAwEAAhEDEQA/ALdw/SDW2W4Rayy3F0WJ12OKSOSyR7ZnxtcHNaRsC0gg7e+iIsIuYvCfTdaaiVzIGyVTXMpEuf27g9ziTufIBG/lFFLY2rRnP//Z'
};

/**
 * Person image mappings
 * Maps person IDs to their local image paths
 */
const personImages: PersonImageMapping = {
  'michael-mataluni': {
    // WebP versions (primary)
    full: '/images/people/full/michael-mataluni.webp',
    display: '/images/people/display/michael-mataluni.webp',
    thumbnail: '/images/people/thumbnails/michael-mataluni.webp',
    
    // JPG fallbacks
    fullJpg: '/images/people/full/michael-mataluni.jpg',
    displayJpg: '/images/people/display/michael-mataluni.jpg',
    thumbnailJpg: '/images/people/thumbnails/michael-mataluni.jpg',
    
    blurDataURL: 'data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wCDEABQADcAPABGADwAMgBQAEYAQQBGAFoAVQBQAF8AeADIAIIAeABuAG4AeAD1AK8AuQCRAMgBIgD/ATEBLAEdAP8BGAETAUABaAHMAYYBQAFUAbMBWQETARgBkAIhAZUBswHbAeoCAwIIAgMBNgGBAjUCXQIwAfQCWAHMAfkCAwHv/9sAgxEAVQBaAFoAeABpAHgA6wCCAIIA6wHvAUoBGAFKAe8B7wHvAe8B7wHvAe8B7wHvAe8B7wHvAe8B7wHvAe8B7wHvAe8B7wHvAe8B7wHvAe8B7wHvAe8B7wHvAe8B7wHvAe8B7wHvAe8B7wHvAe8B7wHvAe8B7wHvAe8B7wHvAe8B7//BABEIAAoACgMBIgACEQEDEQH/xAAfAAABBQEBAQEBAQAAAAAAAAAAAQIDBAUGBwgJCgv/xAC1EAACAQMDAgQDBQUEBAAAAX0BAgMABBEFEiExQQYTUWEHInEUMoGRoQgjQrHBFVLR8CQzYnKCCQoWFxgZGiUmJygpKjQ1Njc4OTpDREVGR0hJSlNUVVZXWFlaY2RlZmdoaWpzdHV2d3h5eoOEhYaHiImKkpOUlZaXmJmaoqOkpaanqKmqsrO0tba3uLm6wsPExcbHyMnK0tPU1dbX2Nna4eLj5OXm5+jp6vHy8/T19vf4+fr/xAAfAQADAQEBAQEBAQEBAAAAAAAAAQIDBAUGBwgJCgv/xAC1EQACAQIEBAMEBwUEBAABAncAAQIDEQQFITEGEkFRB2FxEyIygQgUQpGhscEJIzNS8BVictEKFiQ04SXxFxgZGiYnKCkqNTY3ODk6Q0RFRkdISUpTVFVWV1hZWmNkZWZnaGlqc3R1dnd4eXqCg4SFhoeIiYqSk5SVlpeYmZqio6Slpqeoqaqys7S1tre4ubrCw8TFxsfIycrS09TV1tfY2dri4+Tl5ufo6ery8/T19vf4+fr/2gAMAwEAAhEDEQA/AAUUUVsM/9k='},
  'jahmere-webb': {
    full: '/images/people/full/jahmere-webb.webp',
    display: '/images/people/display/jahmere-webb.webp',
    thumbnail: '/images/people/thumbnails/jahmere-webb.webp',
    
    fullJpg: '/images/people/full/jahmere-webb.jpg',
    displayJpg: '/images/people/display/jahmere-webb.jpg',
    thumbnailJpg: '/images/people/thumbnails/jahmere-webb.jpg',
    
    blurDataURL: 'data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wCDEABQADcAPABGADwAMgBQAEYAQQBGAFoAVQBQAF8AeADIAIIAeABuAG4AeAD1AK8AuQCRAMgBIgD/ATEBLAEdAP8BGAETAUABaAHMAYYBQAFUAbMBWQETARgBkAIhAZUBswHbAeoCAwIIAgMBNgGBAjUCXQIwAfQCWAHMAfkCAwHv/9sAgxEAVQBaAFoAeABpAHgA6wCCAIIA6wHvAUoBGAFKAe8B7wHvAe8B7wHvAe8B7wHvAe8B7wHvAe8B7wHvAe8B7wHvAe8B7wHvAe8B7wHvAe8B7wHvAe8B7wHvAe8B7wHvAe8B7wHvAe8B7wHvAe8B7wHvAe8B7wHvAe8B7wHvAe8B7//BABEIAAoACgMBIgACEQEDEQH/xAAfAAABBQEBAQEBAQAAAAAAAAAAAQIDBAUGBwgJCgv/xAC1EAACAQMDAgQDBQUEBAAAAX0BAgMABBEFEiExQQYTUWEHInEUMoGRoQgjQrHBFVLR8CQzYnKCCQoWFxgZGiUmJygpKjQ1Njc4OTpDREVGR0hJSlNUVVZXWFlaY2RlZmdoaWpzdHV2d3h5eoOEhYaHiImKkpOUlZaXmJmaoqOkpaanqKmqsrO0tba3uLm6wsPExcbHyMnK0tPU1dbX2Nna4eLj5OXm5+jp6vHy8/T19vf4+fr/xAAfAQADAQEBAQEBAQEBAAAAAAAAAQIDBAUGBwgJCgv/xAC1EQACAQIEBAMEBwUEBAABAncAAQIDEQQFITEGEkFRB2FxEyIygQgUQpGhscEJIzNS8BVictEKFiQ04SXxFxgZGiYnKCkqNTY3ODk6Q0RFRkdISUpTVFVWV1hZWmNkZWZnaGlqc3R1dnd4eXqCg4SFhoeIiYqSk5SVlpeYmZqio6Slpqeoqaqys7S1tre4ubrCw8TFxsfIycrS09TV1tfY2dri4+Tl5ufo6ery8/T19vf4+fr/2gAMAwEAAhEDEQA/AGgDFJRRW5mf/9k='},
  'jordan-dungy': {
    full: '/images/people/full/jordan-dungy.webp',
    display: '/images/people/display/jordan-dungy.webp',
    thumbnail: '/images/people/thumbnails/jordan-dungy.webp',
    
    fullJpg: '/images/people/full/jordan-dungy.jpg',
    displayJpg: '/images/people/display/jordan-dungy.jpg',
    thumbnailJpg: '/images/people/thumbnails/jordan-dungy.jpg',
    
    blurDataURL: 'data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wCDEABQADcAPABGADwAMgBQAEYAQQBGAFoAVQBQAF8AeADIAIIAeABuAG4AeAD1AK8AuQCRAMgBIgD/ATEBLAEdAP8BGAETAUABaAHMAYYBQAFUAbMBWQETARgBkAIhAZUBswHbAeoCAwIIAgMBNgGBAjUCXQIwAfQCWAHMAfkCAwHv/9sAgxEAVQBaAFoAeABpAHgA6wCCAIIA6wHvAUoBGAFKAe8B7wHvAe8B7wHvAe8B7wHvAe8B7wHvAe8B7wHvAe8B7wHvAe8B7wHvAe8B7wHvAe8B7wHvAe8B7wHvAe8B7wHvAe8B7wHvAe8B7wHvAe8B7wHvAe8B7wHvAe8B7wHvAe8B7//BABEIAAoACgMBIgACEQEDEQH/xAAfAAABBQEBAQEBAQAAAAAAAAAAAQIDBAUGBwgJCgv/xAC1EAACAQMDAgQDBQUEBAAAAX0BAgMABBEFEiExQQYTUWEHInEUMoGRoQgjQrHBFVLR8CQzYnKCCQoWFxgZGiUmJygpKjQ1Njc4OTpDREVGR0hJSlNUVVZXWFlaY2RlZmdoaWpzdHV2d3h5eoOEhYaHiImKkpOUlZaXmJmaoqOkpaanqKmqsrO0tba3uLm6wsPExcbHyMnK0tPU1dbX2Nna4eLj5OXm5+jp6vHy8/T19vf4+fr/xAAfAQADAQEBAQEBAQEBAAAAAAAAAQIDBAUGBwgJCgv/xAC1EQACAQIEBAMEBwUEBAABAncAAQIDEQQFITEGEkFRB2FxEyIygQgUQpGhscEJIzNS8BVictEKFiQ04SXxFxgZGiYnKCkqNTY3ODk6Q0RFRkdISUpTVFVWV1hZWmNkZWZnaGlqc3R1dnd4eXqCg4SFhoeIiYqSk5SVlpeYmZqio6Slpqeoqaqys7S1tre4ubrCw8TFxsfIycrS09TV1tfY2dri4+Tl5ufo6ery8/T19vf4+fr/2gAMAwEAAhEDEQA/AAUUUVsM/9k='},
  'coach-dungy': {
    full: '/images/people/full/coach-dungy.webp',
    display: '/images/people/display/coach-dungy.webp',
    thumbnail: '/images/people/thumbnails/coach-dungy.webp',
    
    fullJpg: '/images/people/full/coach-dungy.jpg',
    displayJpg: '/images/people/display/coach-dungy.jpg',
    thumbnailJpg: '/images/people/thumbnails/coach-dungy.jpg',
    
    blurDataURL: 'data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wCDEABQADcAPABGADwAMgBQAEYAQQBGAFoAVQBQAF8AeADIAIIAeABuAG4AeAD1AK8AuQCRAMgBIgD/ATEBLAEdAP8BGAETAUABaAHMAYYBQAFUAbMBWQETARgBkAIhAZUBswHbAeoCAwIIAgMBNgGBAjUCXQIwAfQCWAHMAfkCAwHv/9sAgxEAVQBaAFoAeABpAHgA6wCCAIIA6wHvAUoBGAFKAe8B7wHvAe8B7wHvAe8B7wHvAe8B7wHvAe8B7wHvAe8B7wHvAe8B7wHvAe8B7wHvAe8B7wHvAe8B7wHvAe8B7wHvAe8B7wHvAe8B7wHvAe8B7wHvAe8B7wHvAe8B7wHvAe8B7//BABEIAAoACgMBIgACEQEDEQH/xAAfAAABBQEBAQEBAQAAAAAAAAAAAQIDBAUGBwgJCgv/xAC1EAACAQMDAgQDBQUEBAAAAX0BAgMABBEFEiExQQYTUWEHInEUMoGRoQgjQrHBFVLR8CQzYnKCCQoWFxgZGiUmJygpKjQ1Njc4OTpDREVGR0hJSlNUVVZXWFlaY2RlZmdoaWpzdHV2d3h5eoOEhYaHiImKkpOUlZaXmJmaoqOkpaanqKmqsrO0tba3uLm6wsPExcbHyMnK0tPU1dbX2Nna4eLj5OXm5+jp6vHy8/T19vf4+fr/xAAfAQADAQEBAQEBAQEBAAAAAAAAAQIDBAUGBwgJCgv/xAC1EQACAQIEBAMEBwUEBAABAncAAQIDEQQFITEGEkFRB2FxEyIygQgUQpGhscEJIzNS8BVictEKFiQ04SXxFxgZGiYnKCkqNTY3ODk6Q0RFRkdISUpTVFVWV1hZWmNkZWZnaGlqc3R1dnd4eXqCg4SFhoeIiYqSk5SVlpeYmZqio6Slpqeoqaqys7S1tre4ubrCw8TFxsfIycrS09TV1tfY2dri4+Tl5ufo6ery8/T19vf4+fr/2gAMAwEAAhEDEQA/AJKKKK5zU//Z'},
  'jay-forte': {
    full: '/images/people/full/jay-forte.webp',
    display: '/images/people/display/jay-forte.webp',
    thumbnail: '/images/people/thumbnails/jay-forte.webp',
    
    fullJpg: '/images/people/full/jay-forte.jpg',
    displayJpg: '/images/people/display/jay-forte.jpg',
    thumbnailJpg: '/images/people/thumbnails/jay-forte.jpg',
    
    blurDataURL: 'data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wCDEABQADcAPABGADwAMgBQAEYAQQBGAFoAVQBQAF8AeADIAIIAeABuAG4AeAD1AK8AuQCRAMgBIgD/ATEBLAEdAP8BGAETAUABaAHMAYYBQAFUAbMBWQETARgBkAIhAZUBswHbAeoCAwIIAgMBNgGBAjUCXQIwAfQCWAHMAfkCAwHv/9sAgxEAVQBaAFoAeABpAHgA6wCCAIIA6wHvAUoBGAFKAe8B7wHvAe8B7wHvAe8B7wHvAe8B7wHvAe8B7wHvAe8B7wHvAe8B7wHvAe8B7wHvAe8B7wHvAe8B7wHvAe8B7wHvAe8B7wHvAe8B7wHvAe8B7wHvAe8B7wHvAe8B7wHvAe8B7//BABEIAAoACgMBIgACEQEDEQH/xAAfAAABBQEBAQEBAQAAAAAAAAAAAQIDBAUGBwgJCgv/xAC1EAACAQMDAgQDBQUEBAAAAX0BAgMABBEFEiExQQYTUWEHInEUMoGRoQgjQrHBFVLR8CQzYnKCCQoWFxgZGiUmJygpKjQ1Njc4OTpDREVGR0hJSlNUVVZXWFlaY2RlZmdoaWpzdHV2d3h5eoOEhYaHiImKkpOUlZaXmJmaoqOkpaanqKmqsrO0tba3uLm6wsPExcbHyMnK0tPU1dbX2Nna4eLj5OXm5+jp6vHy8/T19vf4+fr/xAAfAQADAQEBAQEBAQEBAAAAAAAAAQIDBAUGBwgJCgv/xAC1EQACAQIEBAMEBwUEBAABAncAAQIDEQQFITEGEkFRB2FxEyIygQgUQpGhscEJIzNS8BVictEKFiQ04SXxFxgZGiYnKCkqNTY3ODk6Q0RFRkdISUpTVFVWV1hZWmNkZWZnaGlqc3R1dnd4eXqCg4SFhoeIiYqSk5SVlpeYmZqio6Slpqeoqaqys7S1tre4ubrCw8TFxsfIycrS09TV1tfY2dri4+Tl5ufo6ery8/T19vf4+fr/2gAMAwEAAhEDEQA/AFFJRRQYH//Z'},
  'martha-henderson': {
    full: '/images/people/full/martha-henderson.webp',
    display: '/images/people/display/martha-henderson.webp',
    thumbnail: '/images/people/thumbnails/martha-henderson.webp',
    
    fullJpg: '/images/people/full/martha-henderson.jpg',
    displayJpg: '/images/people/display/martha-henderson.jpg',
    thumbnailJpg: '/images/people/thumbnails/martha-henderson.jpg',
    
    blurDataURL: 'data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wCDEABQADcAPABGADwAMgBQAEYAQQBGAFoAVQBQAF8AeADIAIIAeABuAG4AeAD1AK8AuQCRAMgBIgD/ATEBLAEdAP8BGAETAUABaAHMAYYBQAFUAbMBWQETARgBkAIhAZUBswHbAeoCAwIIAgMBNgGBAjUCXQIwAfQCWAHMAfkCAwHv/9sAgxEAVQBaAFoAeABpAHgA6wCCAIIA6wHvAUoBGAFKAe8B7wHvAe8B7wHvAe8B7wHvAe8B7wHvAe8B7wHvAe8B7wHvAe8B7wHvAe8B7wHvAe8B7wHvAe8B7wHvAe8B7wHvAe8B7wHvAe8B7wHvAe8B7wHvAe8B7wHvAe8B7wHvAe8B7//BABEIAAoACgMBIgACEQEDEQH/xAAfAAABBQEBAQEBAQAAAAAAAAAAAQIDBAUGBwgJCgv/xAC1EAACAQMDAgQDBQUEBAAAAX0BAgMABBEFEiExQQYTUWEHInEUMoGRoQgjQrHBFVLR8CQzYnKCCQoWFxgZGiUmJygpKjQ1Njc4OTpDREVGR0hJSlNUVVZXWFlaY2RlZmdoaWpzdHV2d3h5eoOEhYaHiImKkpOUlZaXmJmaoqOkpaanqKmqsrO0tba3uLm6wsPExcbHyMnK0tPU1dbX2Nna4eLj5OXm5+jp6vHy8/T19vf4+fr/xAAfAQADAQEBAQEBAQEBAAAAAAAAAQIDBAUGBwgJCgv/xAC1EQACAQIEBAMEBwUEBAABAncAAQIDEQQFITEGEkFRB2FxEyIygQgUQpGhscEJIzNS8BVictEKFiQ04SXxFxgZGiYnKCkqNTY3ODk6Q0RFRkdISUpTVFVWV1hZWmNkZWZnaGlqc3R1dnd4eXqCg4SFhoeIiYqSk5SVlpeYmZqio6Slpqeoqaqys7S1tre4ubrCw8TFxsfIycrS09TV1tfY2dri4+Tl5ufo6ery8/T19vf4+fr/2gAMAwEAAhEDEQA/AGgDFJRRW5mf/9k='}
};

/**
 * Get image data for a person by ID
 * @param personId The person's ID
 * @param role Optional role for fallback blur data
 * @returns Image data or undefined if not found
 */
export function getPersonImageData(personId: string, role?: string): PersonImageData | undefined {
  // Return the person's image data if it exists
  if (personId in personImages) {
    return personImages[personId];
  }
  
  // Return undefined - the component will handle the fallback
  return undefined;
}

export default personImages; 
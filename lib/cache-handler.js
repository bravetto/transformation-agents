/**
 * 🚀 ADVANCED INCREMENTAL CACHE HANDLER
 * Compatible with Next.js 15.4.3 stable API
 */

class OptimizedCacheHandler {
  constructor(options) {
    this.options = options || {};
    this.debug = process.env.NODE_ENV === "development";
    this.cache = new Map();

    if (this.debug) {
      console.log("🚀 OptimizedCacheHandler initialized");
    }
  }

  async get(key, options = {}) {
    try {
      // Check in-memory cache first
      if (this.cache.has(key)) {
        if (this.debug) {
          console.log(`🚀 Cache HIT (memory): ${key}`);
        }
        return this.cache.get(key);
      }

      if (this.debug) {
        console.log(`⚠️ Cache MISS: ${key}`);
      }

      return null;
    } catch (error) {
      if (this.debug) {
        console.warn(`⚠️ Cache GET error: ${key}`, error.message);
      }
      return null;
    }
  }

  async set(key, data, options = {}) {
    try {
      // Optimize cache TTL based on content type
      const optimizedOptions = {
        ...options,
        ttl: this.calculateOptimalTTL(key, data, options),
      };

      // Store in memory cache
      this.cache.set(key, {
        value: data,
        lastModified: Date.now(),
        options: optimizedOptions,
      });

      if (this.debug) {
        console.log(`🚀 Cache SET: ${key}`);
      }

      return Promise.resolve();
    } catch (error) {
      if (this.debug) {
        console.warn(`⚠️ Cache SET error: ${key}`, error.message);
      }
      return Promise.resolve(); // Fail gracefully
    }
  }

  async revalidateTag(tag) {
    try {
      // Clear entries with matching tags
      for (const [key, entry] of this.cache.entries()) {
        if (entry.options?.tags && entry.options.tags.includes(tag)) {
          this.cache.delete(key);
          if (this.debug) {
            console.log(`🚀 Cache INVALIDATED: ${key} (tag: ${tag})`);
          }
        }
      }

      return Promise.resolve();
    } catch (error) {
      if (this.debug) {
        console.warn(`⚠️ Cache REVALIDATE error: ${tag}`, error.message);
      }
      return Promise.resolve();
    }
  }

  resetRequestCache() {
    try {
      this.cache.clear();
      if (this.debug) {
        console.log("🚀 Cache RESET (request scope)");
      }
    } catch (error) {
      if (this.debug) {
        console.warn("⚠️ Cache RESET error:", error.message);
      }
    }
  }

  calculateOptimalTTL(key, data, options) {
    // Dynamic TTL based on content type and size
    const baseTime = 1000 * 60 * 60; // 1 hour

    if (key.includes("_ssg_")) {
      return baseTime * 24; // 24 hours for static pages
    }

    if (key.includes("_ssr_")) {
      return baseTime / 12; // 5 minutes for server-rendered pages
    }

    if (key.includes("api/")) {
      return baseTime / 6; // 10 minutes for API routes
    }

    return options.ttl || baseTime;
  }
}

module.exports = OptimizedCacheHandler;

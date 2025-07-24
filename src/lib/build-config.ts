/**
 * Application build configuration
 */

export const BUILD_CONFIG = {
  /**
   * Current build number - this is automatically updated during the build process
   */
  buildNumber: "3828",

  /**
   * Build timestamp - will be set automatically during build
   */
  buildTimestamp: new Date().toISOString(),

  /**
   * Build environment
   */
  environment: process.env.NODE_ENV || "development",
};

/**
 * Get the current build info as a formatted string
 */
export function getBuildInfo(): string {
  return `Build ${BUILD_CONFIG.buildNumber} (${BUILD_CONFIG.environment})`;
}

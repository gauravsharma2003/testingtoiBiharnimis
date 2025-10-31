export const trackEvent = (eventName, eventData) => {
  if (window.gtag) {
    window.gtag('event', eventName, eventData)
    // console.log(`GA Event: ${eventName}`, eventData)

  }
}

export const trackUserShown = (params = {}) => {
  const payload = {
    type: params.type, // e.g., <game_name>_widget
    page_template: params.page_template, // e.g., listing
    section: params.section, // e.g., games
    subsection: params.subsection, // e.g., N/A
    browsing_platform: params.browsing_platform, // web/mweb/pwa
    game_id: params.game_id, // e.g., N/A
    level: params.level, // e.g., N/A
    game_of_the_day: params.game_of_the_day // e.g., N/A
  }
  trackEvent('user_shown', payload)
}

export const trackUserClick = (params = {}) => {
  const payload = {
    type: params.type, // e.g., <game_name>_widget
    label: params.label, // e.g., play_now / share
    page_template: params.page_template, // e.g., listing
    section: params.section, // e.g., games
    subsection: params.subsection, // e.g., N/A
    browsing_platform: params.browsing_platform, // web/mweb/pwa
    game_id: params.game_id, // e.g., N/A
    level: params.level, // e.g., N/A
    game_of_the_day: params.game_of_the_day // e.g., N/A
  }
  trackEvent('user_click', payload)
}

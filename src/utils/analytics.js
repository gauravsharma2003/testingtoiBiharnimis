export const trackEvent = (eventName, eventData) => {
  console.log(`GA Event: ${eventName}`, eventData)
  if (window.gtag) {
    window.gtag('event', eventName, eventData)
  }
}

export const trackCharacterSelect = (characterName) => {
  trackEvent('character_select', { character_name: characterName })
}

export const trackGameStart = (characterName) => {
  trackEvent('game_start', { character_name: characterName })
}

export const trackMakeChoice = (characterName, decisionNumber, nodeId, choiceText, nextNodeId) => {
  trackEvent('make_choice', {
    character_name: characterName,
    decision_number: decisionNumber,
    node_id: nodeId,
    choice_text: choiceText,
    next_node_id: nextNodeId
  })
}

export const trackGameComplete = (characterName, resultType, endingId, finalPublicApproval, playDurationSeconds) => {
  trackEvent('game_complete', {
    character_name: characterName,
    result_type: resultType,
    ending_id: endingId,
    final_public_approval: finalPublicApproval,
    play_duration_seconds: playDurationSeconds
  })
}

export const trackRestart = (characterName) => {
  trackEvent('restart', { character_name: characterName })
}

export const trackReturnToMenu = (fromScreen, decisionNumberAtExit, characterName) => {
  trackEvent('return_to_menu', {
    from_screen: fromScreen,
    decision_number_at_exit: decisionNumberAtExit,
    character_name: characterName
  })
}

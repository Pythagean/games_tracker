function toLocalISOFormat(date) {
    const pad = num => String(num).padStart(2, '0');

    return `${date.getFullYear()}-${pad(date.getMonth() + 1)}-${pad(date.getDate())}T` +
           `${pad(date.getHours())}:${pad(date.getMinutes())}:${pad(date.getSeconds())}`;
}

function toggleSwitchMode(sessionPlatformValue) {
    // Check if the selected game mode is Online Multiplayer or Local Multiplayer
    if (sessionPlatformValue === "Nintendo Switch") {
        // Enable the multiplayer options select
        $('#session-switch-mode').prop('disabled', false).trigger('change');
    } else {
        // Disable the multiplayer options select if a different game mode is selected
        $('#session-switch-mode').prop('disabled', true).val("N/A").trigger('change');
    }
}
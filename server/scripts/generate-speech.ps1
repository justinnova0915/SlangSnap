param(
    [string]$Text,
    [string]$OutputPath,
    [string]$VoiceId
)

Add-Type -AssemblyName System.Speech
$synth = New-Object System.Speech.Synthesis.SpeechSynthesizer

Write-Host "Available voices:"
$synth.GetInstalledVoices() | ForEach-Object { Write-Host $_.VoiceInfo.Name }

Write-Host "Setting output file to: $OutputPath"
$synth.SetOutputToWaveFile($OutputPath)

if ($VoiceId) {
    Write-Host "Selecting voice: $VoiceId"
    $synth.SelectVoice($VoiceId)
}

Write-Host "Speaking text: $Text"
$synth.Speak($Text)

$synth.Dispose()

if (Test-Path $OutputPath) {
    Write-Host "Audio file created successfully"
    exit 0
} else {
    Write-Error "Failed to create audio file"
    exit 1
}
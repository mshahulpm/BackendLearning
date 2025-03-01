/**
4. Interface Segregation Principle (ISP):
Definition: Clients should not be forced to depend on interfaces they do not use.

Explanation: Instead of having a large, monolithic interface, create smaller, more specific interfaces so that clients only need to know about the methods relevant to them.
 */

interface MediaPlayer {
    playAudio(): void
    playVideo(): void
    showLyrics(): string
}

// above interface should be splitted to multiple small interfaces
interface AudioPlayer {
    playAudio(): void
}

interface VideoPlayer {
    playVideo(): void
}

interface LyricDisplay {
    showLyrics(): string
}

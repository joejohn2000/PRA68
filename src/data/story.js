const story = {
  intro: {
    image: "https://i.imgur.com/zw7rYvj.jpg",
    message: "You wake up in a dense, silent forest. The air is cold...",
    options: [
      { key: "1", text: "Follow the whispering voice", next: "goVoice" },
      { key: "2", text: "Walk toward the faint light", next: "goLight" },
      { key: "3", text: "Stay still and try to remember", next: "goMemory" },
    ],
  },
  goVoice: {
    image: "https://i.imgur.com/VCuAvwK.jpg",
    message: "The voice grows louder. You see no one...",
    options: [
      { key: "1", text: "Run!", next: "goRunFromVoice" },
      { key: "2", text: "Call out: 'Who's there?'", next: "goTalkVoice" },
    ],
  },
  goLight: {
    image: "https://i.imgur.com/mzBWiJE.jpg",
    message: "You reach a glowing tree with silver leaves...",
    options: [
      { key: "1", text: "Touch the crystal", next: "endGood" },
      { key: "2", text: "Sit and rest", next: "endNeutral" },
    ],
  },
  goMemory: {
    image: "https://i.imgur.com/Q3kFxkF.jpg",
    message: "You close your eyes. Memories flash...",
    options: [
      { key: "1", text: "Try to run", next: "goRun" },
      { key: "2", text: "Accept the truth", next: "endSuspense" },
    ],
  },
  goTalkVoice: {
    image: "https://i.imgur.com/NUn1iXs.jpg",
    message: "The voice says, 'You forgot me.' You feel hands...",
    options: [],
    ending: "HORROR ENDING - The Taken",
  },
  endGood: {
    image: "https://i.imgur.com/M3J6X3p.jpg",
    message: "You become the guardian of the spring. You’re safe.",
    options: [],
    ending: "GOOD ENDING - The Guardian",
  },
  endNeutral: {
    image: "https://i.imgur.com/IgVuyz5.jpg",
    message: "You wander endlessly. You are safe but lost.",
    options: [],
    ending: "NEUTRAL ENDING",
  },
  endSuspense: {
    image: "https://i.imgur.com/1bh3NYY.jpg",
    message: "A door appears… You reach for it…",
    options: [],
    ending: "SUSPENSE ENDING - To be continued...",
  },
};

export default story;

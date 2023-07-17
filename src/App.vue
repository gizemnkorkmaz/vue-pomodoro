<template>
  <div
    class="flex justify-center items-center flex-col gap-4 bg-indigo-100/20 px-16 py-10 rounded-xl"
  >
    <span class="text-indigo-300">{{ roundName() }}</span>
    <span
      class="text-indigo-200 text-8xl min-w-[285px] text-center tabular-nums"
      >{{ remainingTime }}</span
    >
    <div class="mt-8 flex justify-center items-center gap-4">
      <button @click="toggleSound()">
        <SoundOn v-if="appState.settings.isSoundsOn" class="text-indigo-200" />
        <SoundOff v-else class="text-indigo-200" />
      </button>
      <div>
        <button
          @click="startTimer(appState)"
          v-if="!appState.timer.isTicking"
          class="rounded-full bg-indigo-200 py-2 px-4 text-indigo-900 min-w-[100px] border border-transparent"
        >
          Start
        </button>
        <button
          @click="pauseTimer(appState)"
          v-if="appState.timer.isTicking"
          class="rounded-full py-2 px-4 text-indigo-900 min-w-[100px] border text-indigo-200"
        >
          Pause
        </button>
      </div>
      <button @click="skipRound(appState)">
        <SkipIcon class="text-indigo-200" />
      </button>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed } from "vue";
import { initialState, DEFAULT_SETTINGS, Round } from "./domain";
import { startTimer, pauseTimer, skipRound } from "./actions";
import { formatDuration } from "./durationFormat";

import SkipIcon from "@/assets/skip-end.svg";
import SoundOff from "@/assets/soundOff.svg";
import SoundOn from "@/assets/soundOn.svg";
import soundData from "@/assets/timeout.wav";

const appState = ref(initialState(DEFAULT_SETTINGS));
const sound = new Audio(soundData);

appState.value.onRoundFinished = () => {
  if (appState.value.settings.isSoundsOn) {
    sound.play();
  }
};

const remainingTime = computed(() => {
  const remainingSeconds = appState.value.timer.remainingSeconds;

  return formatDuration(remainingSeconds);
});

function roundName() {
  switch (appState.value.round) {
    case Round.Working:
      return "Time to work";
    case Round.Break:
    case Round.LongBreak:
      return "Break time";
  }
}

function toggleSound() {
  appState.value.settings.isSoundsOn = !appState.value.settings.isSoundsOn;
}
</script>

<style scoped></style>

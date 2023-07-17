import { Round, type ApplicationState, durationForRound, nextRound } from "./domain";

function setRound(state: ApplicationState, round: Round) {
    pauseTimer(state);

    state.round = round
    state.timer = {
        isTicking: false,
        remainingSeconds: durationForRound(state.round, state.settings)
    }
}

export function tick(state: ApplicationState) {
    state.timer.remainingSeconds -= 1;

    const remainingSeconds = state.timer.remainingSeconds

    if (remainingSeconds <= 0) {
        if (state.round === Round.Working) {
            state.totalWorkingRounds++
        }

        const newRound = nextRound(state.round, state.totalWorkingRounds)
        setRound(state, newRound)

        if (state.onRoundFinished) {
            state.onRoundFinished();
        }
    }
}

export function startTimer(state: ApplicationState) {
    if (!state.timer.intervalId) {
        state.timer.intervalId = setInterval(() => tick(state), 1000);
        state.timer.isTicking = true
    }
}

export function pauseTimer(state: ApplicationState) {
    if (state.timer.intervalId) {
        clearInterval(state.timer.intervalId);
        state.timer.intervalId = undefined;
        state.timer.isTicking = false
    }
}

export function skipRound(state: ApplicationState) {
    if (state.round === Round.Working) {
        state.totalWorkingRounds++
    }

    const newRound = nextRound(state.round, state.totalWorkingRounds)
    setRound(state, newRound)
}
export enum Round {
    Working,
    Break,
    LongBreak
}

export interface Timer {
    remainingSeconds: number;
    isTicking: boolean;
    intervalId?: number;
}

export interface Settings {
    workingRoundDuration: number;
    isSoundsOn: boolean;
}

export const DEFAULT_SETTINGS: Settings = {
    workingRoundDuration: 60 * 25,
    isSoundsOn: true,
};

export interface ApplicationState {
    round: Round;
    totalWorkingRounds: number;
    timer: Timer;
    settings: Settings;
    onRoundFinished?: { (): void };
}

export function initialState(settings: Settings): ApplicationState {
    return {
        round: Round.Working,
        totalWorkingRounds: 0,
        timer: {
            isTicking: false,
            remainingSeconds: settings.workingRoundDuration,
        },
        settings: settings,
    };
}

export function durationForRound(round: Round, settings: Settings): number {
    switch (round) {
        case Round.Working:
            return settings.workingRoundDuration
        case Round.Break:
            return 60 * 5
        case Round.LongBreak:
            return 60 * 15
    }
}

export function nextRound(current: Round, totalWorkingRounds: number): Round {
    switch (current) {
        case Round.Working:
            const isLongBreak = totalWorkingRounds % 4 == 0;
            return isLongBreak ? Round.LongBreak : Round.Break;

        case Round.Break:
        case Round.LongBreak:
            return Round.Working;
    }
}

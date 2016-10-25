import { Observable } from "rxjs/Observable";
import "rxjs/add/observable/of";
import "rxjs/add/observable/merge";
import "rxjs/add/operator/distinctUntilChanged";
import "rxjs/add/operator/filter";
import "rxjs/add/operator/map";
import "rxjs/add/operator/switchMap";
import "rxjs/add/operator/startWith";
import "rxjs/add/operator/observeOn";
import "rxjs/add/operator/subscribeOn";
import "rxjs/add/operator/debounceTime";
import "rxjs/add/operator/timeout";
import * as deepEqual from "deep-equal";
import {
  reassign, reassignif,
  actionCreator, TypedActionDescription, EmptyActionDescription,
  reducerFromActions, Reducer, StateUpdate,
  createStore, Store, StoreMiddleware,
  withEffects, defineStore, ICreateStoreOptions, logUpdates,
  tunnelActions, extendWithActions, extendWith, Action,
} from "rxstore";

/* MODELS */

export interface SettingsState {
  isOpen: boolean;
  isDrawed: boolean;
  username: string;
}

export interface SetUserPayload {
  name: string;
}

/* ACTIONS */

export interface SettingsEvents {
  toggleSettings(): void;
  filterByStatus(payload: string): void;
  cleanFilters(): void;
}

const newEvent = actionCreator<SettingsState>("MantTest.Settings/");

export const SettingsActions = {
  toggleSettings: newEvent("TOGGLE_SETTINGS", s => reassign(s, {isOpen: !s.isOpen})),

  setEnableSettings: newEvent.of<boolean>("SET_ENABLE_SETTINGS", (s, p) => reassign(s, {isDrawed: p})),

  filterByStatus: newEvent.of<string>("FILTER_BY_STATUS"),

  cleanFilters: newEvent("CLEAN_FILTERS"),

  setUser: newEvent.of<SetUserPayload>("SET_USER", (s, p) => reassign(s, {username: p.name})),
};

/* STORE */

const SettingsReducer = reducerFromActions(SettingsActions);

export type SettingsStore = Store<SettingsState> & SettingsEvents;

export const defaultSettingsState = (): SettingsState => ({
  isOpen: false,
  isDrawed: true,
  username: "",
});

export const createSettingsStore = () => defineStore<SettingsState, SettingsStore>(
  SettingsReducer,
  defaultSettingsState,
  extendWithActions(SettingsActions),
);

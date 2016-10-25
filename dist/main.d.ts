// Generated by dts-bundle v0.5.0
// Dependencies for this module:
//   ../rxstore

declare module 'manttest-client-settings-store' {
	export * from "manttest-client-settings-store/index";
}

declare module 'manttest-client-settings-store/index' {
	export * from "manttest-client-settings-store/store";
}

declare module 'manttest-client-settings-store/store' {
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
	import { TypedActionDescription, EmptyActionDescription, Store, ICreateStoreOptions } from "rxstore";
	export interface SettingsState {
		isOpen: boolean;
		isDrawed: boolean;
		username: string;
	}
	export interface SetUserPayload {
		name: string;
	}
	export interface SettingsEvents {
		toggleSettings(): void;
		filterByStatus(payload: string): void;
		cleanFilters(): void;
	}
	export const SettingsActions: {
		toggleSettings: EmptyActionDescription<SettingsState>;
		setEnableSettings: TypedActionDescription<SettingsState, boolean>;
		filterByStatus: TypedActionDescription<SettingsState, string>;
		cleanFilters: EmptyActionDescription<SettingsState>;
		setUser: TypedActionDescription<SettingsState, SetUserPayload>;
	};
	export type SettingsStore = Store<SettingsState> & SettingsEvents;
	export const defaultSettingsState: () => SettingsState;
	export const createSettingsStore: () => (options?: ICreateStoreOptions<SettingsState> | undefined) => SettingsStore;
}


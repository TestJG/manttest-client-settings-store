"use strict";

import "jest";
require("babel-core/register");
require("babel-polyfill");
import { Observable } from "rxjs/Observable";
import { queue } from "rxjs/scheduler/queue";
import "rxjs/add/observable/concat";
import "rxjs/add/observable/empty";
import "rxjs/add/observable/of";
import "rxjs/add/operator/catch";
import "rxjs/add/operator/concat";
import "rxjs/add/operator/delay";
import "rxjs/add/operator/do";
import "rxjs/add/operator/first";
import "rxjs/add/operator/filter";
import "rxjs/add/operator/last";
import "rxjs/add/operator/map";
import "rxjs/add/operator/observeOn";
import "rxjs/add/operator/subscribeOn";
import "rxjs/add/operator/switchMap";
import "rxjs/add/operator/takeLast";
import "rxjs/add/operator/timeout";
import "rxjs/add/operator/toPromise";
import * as deepEqual from "deep-equal";
import {
    reassign, Store, Action, StoreActions, logUpdates, startEffects,
    tunnelActions, ActionTunnel,
} from "rxstore";
import { testActions, expectedActions } from "rxstore-jest";
import {
    testUpdateEffects, testActionEffects, testStateEffects,
    expectAction, expectItem, testLastStateEffects,
} from "rxstore-jest";

import { defaultSettingsState, SettingsState, SettingsStore, createSettingsStore, SettingsActions } from "./store";

describe("defaultSettingsState", () => {
  describe("Sanity checks", () => {
    it("Should be a function", () => {
        expect(typeof defaultSettingsState).toBe("function");
    });
  });

  describe("Given no options", () => {
    it("The default state should have default values", () => {
      const state = defaultSettingsState();
      expect(state.isDrawed).toEqual(true);
      expect(state.isOpen).toEqual(false);
      expect(state.username).toEqual("");
    });
  });

});

describe("createSettingsStore", () => {
    describe("Sanity checks", () => {
        it("should be a function", () => expect(typeof createSettingsStore).toBe("function"));
    });

    testLastStateEffects<SettingsState, SettingsStore>("Given a defaultAppTitleState", createSettingsStore())
        ("When the store receives no actions", "The state should be as expected", [],
        state => {
            expect(state.isDrawed).toEqual(defaultSettingsState().isDrawed);
            expect(state.isOpen).toEqual(defaultSettingsState().isOpen);
            expect(state.username).toEqual(defaultSettingsState().username);
        });
});

const init = defaultSettingsState();
const initUser = reassign(init, {username: "TEST"});
const initUser2 = reassign(init, {username: "----"});
const initOpen = reassign(init, {isOpen: true});
const initDrawed = reassign(init, {isDrawed: true});
const initNotDrawed = reassign(init, {isDrawed: false});
const initClose = reassign(initOpen, {isOpen: false});

testActions(SettingsActions, "defaultSettingsState", expectedActions<SettingsState>("MantTest.Settings/",
    actions => {
        actions.empty("toggleSettings", "TOGGLE_SETTINGS")
            .withSample(init, initOpen)
            .withSample(initOpen, initClose);

        actions.typed("setEnableSettings", "SET_ENABLE_SETTINGS")
            .withSample(init, true, initDrawed)
            .withSample(init, false, initNotDrawed)
            .withSample(initDrawed, false, initNotDrawed);

        actions.typed("filterByStatus", "FILTER_BY_STATUS");

        actions.empty("cleanFilters", "CLEAN_FILTERS");

        actions.typed("setUser", "SET_USER")
            .withSample(init, {name: ""}, init)
            .withSample(init, {name: "TEST"}, initUser)
            .withSample(initUser, {name: "----"}, initUser2)
            .withSample(initUser2, {name: ""}, init);
    }

));

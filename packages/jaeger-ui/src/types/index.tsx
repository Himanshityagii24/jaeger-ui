// Copyright (c) 2017 Uber Technologies, Inc.
//
// Licensed under the Apache License, Version 2.0 (the "License");
// you may not use this file except in compliance with the License.
// You may obtain a copy of the License at
//
// http://www.apache.org/licenses/LICENSE-2.0
//
// Unless required by applicable law or agreed to in writing, software
// distributed under the License is distributed on an "AS IS" BASIS,
// WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
// See the License for the specific language governing permissions and
// limitations under the License.

import { Router } from 'react-router-dom';
import { Location } from 'history';

import { ApiError } from './api-error';
import { TracesArchive } from './archive';
import { Config } from './config';
import { EmbeddedState } from './embedded';
import { SearchQuery } from './search';
import TDdgState from './TDdgState';
import tNil from './TNil';
import iWebAnalytics from './tracking';
import { Trace } from './trace';
import TTraceDiffState from './TTraceDiffState';
import TTraceTimeline from './TTraceTimeline';
import { MetricsReduxState } from './metrics';

export type TNil = tNil;
export type IWebAnalytics = iWebAnalytics;

export type FetchedState = 'FETCH_DONE' | 'FETCH_ERROR' | 'FETCH_LOADING';

export type FetchedTrace = {
  data?: Trace;
  error?: ApiError;
  id: string;
  state?: FetchedState;
};

export type LocationState = {
  fromSearch?: string;
};

export type ReduxState = {
  archive: TracesArchive;
  type: string;
  config: Config;
  ddg: TDdgState;
  dependencies: {
    dependencies: { parent: string; child: string; callCount: number }[];
    loading: boolean;
    error: ApiError | TNil;
  };
  embedded: EmbeddedState;
  router: Router & {
    location: Location<LocationState>;
  };
  services: {
    services: string[] | TNil;
    serverOpsForService: Record<string, string[]>;
    operationsForService: Record<string, string[]>;
    loading: boolean;
    error: ApiError | TNil;
  };
  trace: {
    traces: Record<string, FetchedTrace>;
    search: {
      error?: ApiError;
      results: string[];
      state?: FetchedState;
      query?: SearchQuery;
    };
  };
  traceDiff: TTraceDiffState;
  traceTimeline: TTraceTimeline;
  metrics: MetricsReduxState;
};

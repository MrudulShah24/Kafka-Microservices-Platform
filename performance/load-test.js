import http from 'k6/http';
import { check } from 'k6';

// k6 options for load testing
// Run a specific test run by passing VUs and duration arguments:
//   50 Users:  k6 run --vus 50 --duration 30s performance/load-test.js
//   100 Users: k6 run --vus 100 --duration 30s performance/load-test.js
//   200 Users: k6 run --vus 200 --duration 30s performance/load-test.js
export const options = {
  vus: 50, // Default to 50 concurrent virtual users
  duration: '30s', // Default test duration
  thresholds: {
    http_req_failed: ['rate<0.01'],   // Request failure rate must be below 1%
    http_req_duration: ['p(95)<800'], // 95% of requests must complete under 800ms
  },
};

export default function () {
  // Query orders list through the API Gateway (port 8060)
  // No sleep is used in order to measure maximum throughput (RPS)
  const res = http.get('http://localhost:8060/api/orders');
  
  check(res, {
    'status is 200': (r) => r.status === 200,
  });
}

#include <node_api.h>
#include <assert.h>

// JS function: add(a, b)
napi_value Add(napi_env env, napi_callback_info info) {
  size_t argc = 2;
  napi_value args[2];
  napi_get_cb_info(env, info, &argc, args, nullptr, nullptr);

  double a, b;
  napi_get_value_double(env, args[0], &a);
  napi_get_value_double(env, args[1], &b);

  napi_value result;
  napi_create_double(env, a + b, &result);

  return result;
}

// Module init
napi_value Init(napi_env env, napi_value exports) {
  napi_value fn;
  napi_create_function(env, nullptr, 0, Add, nullptr, &fn);
  napi_set_named_property(env, exports, "add", fn);
  return exports;
}

NAPI_MODULE(NODE_GYP_MODULE_NAME, Init)

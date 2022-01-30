/**
 *
 * This file is auto-generated. Do not edit manually: changes may be erased.
 * Generated by Aqua compiler: https://github.com/fluencelabs/aqua/.
 * If you find any bugs, please write an issue on GitHub: https://github.com/fluencelabs/aqua/issues
 * Aqua version: 0.5.3-260
 *
 */
import { Fluence, FluencePeer } from '@fluencelabs/fluence';
import {
    CallParams,
    callFunction,
    registerService,
} from '@fluencelabs/fluence/dist/internal/compilerSupport/v2';


// Services

export interface MonitorServiceDef {
    message: (message: string, callParams: CallParams<'message'>) => string | Promise<string>;
    monitor: (address: string, callParams: CallParams<'address'>) => boolean | Promise<boolean>;
    return: (result: string, callParams: CallParams<'result'>) => void | Promise<void>;
}
export function registerMonitorService(service: MonitorServiceDef): void;
export function registerMonitorService(serviceId: string, service: MonitorServiceDef): void;
export function registerMonitorService(peer: FluencePeer, service: MonitorServiceDef): void;
export function registerMonitorService(peer: FluencePeer, serviceId: string, service: MonitorServiceDef): void;
       

export function registerMonitorService(...args: any) {
    registerService(
        args,
        {
    "defaultServiceId" : "HelloPeer",
    "functions" : [
        {
            "functionName" : "message",
            "argDefs" : [
                {
                    "name" : "message",
                    "argType" : {
                        "tag" : "primitive"
                    }
                }
            ],
            "returnType" : {
                "tag" : "primitive"
            }
        },
        {
            "functionName" : "monitor",
            "argDefs" : [
                {
                    "name" : "address",
                    "argType" : {
                        "tag" : "primitive"
                    }
                }
            ],
            "returnType" : {
                "tag" : "primitive"
            }
        },
        {
            "functionName" : "return",
            "argDefs" : [
                {
                    "name" : "result",
                    "argType" : {
                        "tag" : "primitive"
                    }
                }
            ],
            "returnType" : {
                "tag" : "void"
            }
        }
    ]
}
    );
}
      
// Functions
 

export function startMonitoring(
    peerId: string,
    relayId: string,
    address: string,
    config?: {ttl?: number}
): Promise<boolean>;

export function startMonitoring(
    peer: FluencePeer,
    peerId: string,
    relayId: string,
    address: string,
    config?: {ttl?: number}
): Promise<boolean>;

export function startMonitoring(...args: any) {

    let script = `
                    (xor
                     (seq
                      (seq
                       (seq
                        (seq
                         (seq
                          (seq
                           (seq
                            (call %init_peer_id% ("getDataSrv" "-relay-") [] -relay-)
                            (call %init_peer_id% ("getDataSrv" "peerId") [] peerId)
                           )
                           (call %init_peer_id% ("getDataSrv" "relayId") [] relayId)
                          )
                          (call %init_peer_id% ("getDataSrv" "address") [] address)
                         )
                         (call -relay- ("op" "noop") [])
                        )
                        (call relayId ("op" "noop") [])
                       )
                       (xor
                        (seq
                         (seq
                          (call peerId ("HelloPeer" "monitor") [address] res)
                          (call relayId ("op" "noop") [])
                         )
                         (call -relay- ("op" "noop") [])
                        )
                        (seq
                         (seq
                          (call relayId ("op" "noop") [])
                          (call -relay- ("op" "noop") [])
                         )
                         (call %init_peer_id% ("errorHandlingSrv" "error") [%last_error% 1])
                        )
                       )
                      )
                      (xor
                       (call %init_peer_id% ("callbackSrv" "response") [res])
                       (call %init_peer_id% ("errorHandlingSrv" "error") [%last_error% 2])
                      )
                     )
                     (call %init_peer_id% ("errorHandlingSrv" "error") [%last_error% 3])
                    )
    `
    return callFunction(
        args,
        {
    "functionName" : "startMonitoring",
    "returnType" : {
        "tag" : "primitive"
    },
    "argDefs" : [
        {
            "name" : "peerId",
            "argType" : {
                "tag" : "primitive"
            }
        },
        {
            "name" : "relayId",
            "argType" : {
                "tag" : "primitive"
            }
        },
        {
            "name" : "address",
            "argType" : {
                "tag" : "primitive"
            }
        }
    ],
    "names" : {
        "relay" : "-relay-",
        "getDataSrv" : "getDataSrv",
        "callbackSrv" : "callbackSrv",
        "responseSrv" : "callbackSrv",
        "responseFnName" : "response",
        "errorHandlingSrv" : "errorHandlingSrv",
        "errorFnName" : "error"
    }
},
        script
    )
}

 

export function sendMessage(
    peerId: string,
    relayId: string,
    message: string,
    config?: {ttl?: number}
): Promise<string>;

export function sendMessage(
    peer: FluencePeer,
    peerId: string,
    relayId: string,
    message: string,
    config?: {ttl?: number}
): Promise<string>;

export function sendMessage(...args: any) {

    let script = `
                    (xor
                     (seq
                      (seq
                       (seq
                        (seq
                         (seq
                          (seq
                           (seq
                            (call %init_peer_id% ("getDataSrv" "-relay-") [] -relay-)
                            (call %init_peer_id% ("getDataSrv" "peerId") [] peerId)
                           )
                           (call %init_peer_id% ("getDataSrv" "relayId") [] relayId)
                          )
                          (call %init_peer_id% ("getDataSrv" "message") [] message)
                         )
                         (call -relay- ("op" "noop") [])
                        )
                        (call relayId ("op" "noop") [])
                       )
                       (xor
                        (seq
                         (seq
                          (call peerId ("HelloPeer" "message") [message] res)
                          (call relayId ("op" "noop") [])
                         )
                         (call -relay- ("op" "noop") [])
                        )
                        (seq
                         (seq
                          (call relayId ("op" "noop") [])
                          (call -relay- ("op" "noop") [])
                         )
                         (call %init_peer_id% ("errorHandlingSrv" "error") [%last_error% 1])
                        )
                       )
                      )
                      (xor
                       (call %init_peer_id% ("callbackSrv" "response") [res])
                       (call %init_peer_id% ("errorHandlingSrv" "error") [%last_error% 2])
                      )
                     )
                     (call %init_peer_id% ("errorHandlingSrv" "error") [%last_error% 3])
                    )
    `
    return callFunction(
        args,
        {
    "functionName" : "sendMessage",
    "returnType" : {
        "tag" : "primitive"
    },
    "argDefs" : [
        {
            "name" : "peerId",
            "argType" : {
                "tag" : "primitive"
            }
        },
        {
            "name" : "relayId",
            "argType" : {
                "tag" : "primitive"
            }
        },
        {
            "name" : "message",
            "argType" : {
                "tag" : "primitive"
            }
        }
    ],
    "names" : {
        "relay" : "-relay-",
        "getDataSrv" : "getDataSrv",
        "callbackSrv" : "callbackSrv",
        "responseSrv" : "callbackSrv",
        "responseFnName" : "response",
        "errorHandlingSrv" : "errorHandlingSrv",
        "errorFnName" : "error"
    }
},
        script
    )
}

 

export function returnResult(
    peerId: string,
    relayId: string,
    result: string,
    config?: {ttl?: number}
): Promise<void>;

export function returnResult(
    peer: FluencePeer,
    peerId: string,
    relayId: string,
    result: string,
    config?: {ttl?: number}
): Promise<void>;

export function returnResult(...args: any) {

    let script = `
                    (xor
                     (seq
                      (seq
                       (seq
                        (seq
                         (seq
                          (seq
                           (call %init_peer_id% ("getDataSrv" "-relay-") [] -relay-)
                           (call %init_peer_id% ("getDataSrv" "peerId") [] peerId)
                          )
                          (call %init_peer_id% ("getDataSrv" "relayId") [] relayId)
                         )
                         (call %init_peer_id% ("getDataSrv" "result") [] result)
                        )
                        (call -relay- ("op" "noop") [])
                       )
                       (call relayId ("op" "noop") [])
                      )
                      (xor
                       (seq
                        (seq
                         (call peerId ("HelloPeer" "return") [result])
                         (call relayId ("op" "noop") [])
                        )
                        (call -relay- ("op" "noop") [])
                       )
                       (seq
                        (seq
                         (call relayId ("op" "noop") [])
                         (call -relay- ("op" "noop") [])
                        )
                        (call %init_peer_id% ("errorHandlingSrv" "error") [%last_error% 1])
                       )
                      )
                     )
                     (call %init_peer_id% ("errorHandlingSrv" "error") [%last_error% 2])
                    )
    `
    return callFunction(
        args,
        {
    "functionName" : "returnResult",
    "returnType" : {
        "tag" : "void"
    },
    "argDefs" : [
        {
            "name" : "peerId",
            "argType" : {
                "tag" : "primitive"
            }
        },
        {
            "name" : "relayId",
            "argType" : {
                "tag" : "primitive"
            }
        },
        {
            "name" : "result",
            "argType" : {
                "tag" : "primitive"
            }
        }
    ],
    "names" : {
        "relay" : "-relay-",
        "getDataSrv" : "getDataSrv",
        "callbackSrv" : "callbackSrv",
        "responseSrv" : "callbackSrv",
        "responseFnName" : "response",
        "errorHandlingSrv" : "errorHandlingSrv",
        "errorFnName" : "error"
    }
},
        script
    )
}

import { useState, useEffect, useRef } from "react";

// ─── PDF REPORTS (base64 encoded) ────────────────────────────────────────────
const PDF_DIAG = "JVBERi0xLjQKJZOMi54gUmVwb3J0TGFiIEdlbmVyYXRlZCBQREYgZG9jdW1lbnQgKG9wZW5zb3VyY2UpCjEgMCBvYmoKPDwKL0YxIDIgMCBSIC9GMiAzIDAgUiAvRjMgNCAwIFIgL0Y0IDUgMCBSIC9GNSA2IDAgUiAvRjYgNyAwIFIKPj4KZW5kb2JqCjIgMCBvYmoKPDwKL0Jhc2VGb250IC9IZWx2ZXRpY2EgL0VuY29kaW5nIC9XaW5BbnNpRW5jb2RpbmcgL05hbWUgL0YxIC9TdWJ0eXBlIC9UeXBlMSAvVHlwZSAvRm9udAo+PgplbmRvYmoKMyAwIG9iago8PAovQmFzZUZvbnQgL0hlbHZldGljYS1Cb2xkIC9FbmNvZGluZyAvV2luQW5zaUVuY29kaW5nIC9OYW1lIC9GMiAvU3VidHlwZSAvVHlwZTEgL1R5cGUgL0ZvbnQKPj4KZW5kb2JqCjQgMCBvYmoKPDwKL0Jhc2VGb250IC9IZWx2ZXRpY2EtQm9sZE9ibGlxdWUgL0VuY29kaW5nIC9XaW5BbnNpRW5jb2RpbmcgL05hbWUgL0YzIC9TdWJ0eXBlIC9UeXBlMSAvVHlwZSAvRm9udAo+PgplbmRvYmoKNSAwIG9iago8PAovQmFzZUZvbnQgL1phcGZEaW5nYmF0cyAvTmFtZSAvRjQgL1N1YnR5cGUgL1R5cGUxIC9UeXBlIC9Gb250Cj4+CmVuZG9iago2IDAgb2JqCjw8Ci9CYXNlRm9udCAvVGltZXMtUm9tYW4gL0VuY29kaW5nIC9XaW5BbnNpRW5jb2RpbmcgL05hbWUgL0Y1IC9TdWJ0eXBlIC9UeXBlMSAvVHlwZSAvRm9udAo+PgplbmRvYmoKNyAwIG9iago8PAovQmFzZUZvbnQgL1N5bWJvbCAvTmFtZSAvRjYgL1N1YnR5cGUgL1R5cGUxIC9UeXBlIC9Gb250Cj4+CmVuZG9iago4IDAgb2JqCjw8Ci9Db250ZW50cyAxMyAwIFIgL01lZGlhQm94IFsgMCAwIDU5NS4yNzU2IDg0MS44ODk4IF0gL1BhcmVudCAxMiAwIFIgL1Jlc291cmNlcyA8PAovRm9udCAxIDAgUiAvUHJvY1NldCBbIC9QREYgL1RleHQgL0ltYWdlQiAvSW1hZ2VDIC9JbWFnZUkgXQo+PiAvUm90YXRlIDAgL1RyYW5zIDw8Cgo+PiAKICAvVHlwZSAvUGFnZQo+PgplbmRvYmoKOSAwIG9iago8PAovQ29udGVudHMgMTQgMCBSIC9NZWRpYUJveCBbIDAgMCA1OTUuMjc1NiA4NDEuODg5OCBdIC9QYXJlbnQgMTIgMCBSIC9SZXNvdXJjZXMgPDwKL0ZvbnQgMSAwIFIgL1Byb2NTZXQgWyAvUERGIC9UZXh0IC9JbWFnZUIgL0ltYWdlQyAvSW1hZ2VJIF0KPj4gL1JvdGF0ZSAwIC9UcmFucyA8PAoKPj4gCiAgL1R5cGUgL1BhZ2UKPj4KZW5kb2JqCjEwIDAgb2JqCjw8Ci9QYWdlTW9kZSAvVXNlTm9uZSAvUGFnZXMgMTIgMCBSIC9UeXBlIC9DYXRhbG9nCj4+CmVuZG9iagoxMSAwIG9iago8PAovQXV0aG9yIChcKGFub255bW91c1wpKSAvQ3JlYXRpb25EYXRlIChEOjIwMjYwMzI1MTA0NDU0KzAwJzAwJykgL0NyZWF0b3IgKFwodW5zcGVjaWZpZWRcKSkgL0tleXdvcmRzICgpIC9Nb2REYXRlIChEOjIwMjYwMzI1MTA0NDU0KzAwJzAwJykgL1Byb2R1Y2VyIChSZXBvcnRMYWIgUERGIExpYnJhcnkgLSBcKG9wZW5zb3VyY2VcKSkgCiAgL1N1YmplY3QgKFwodW5zcGVjaWZpZWRcKSkgL1RpdGxlIChcKGFub255bW91c1wpKSAvVHJhcHBlZCAvRmFsc2UKPj4KZW5kb2JqCjEyIDAgb2JqCjw8Ci9Db3VudCAyIC9LaWRzIFsgOCAwIFIgOSAwIFIgXSAvVHlwZSAvUGFnZXMKPj4KZW5kb2JqCjEzIDAgb2JqCjw8Ci9GaWx0ZXIgWyAvQVNDSUk4NURlY29kZSAvRmxhdGVEZWNvZGUgXSAvTGVuZ3RoIDMxODYKPj4Kc3RyZWFtCkdiIVNuOTY2VW8nIypbNWpNZyghYHUqPkczNkdbU0wzTlNzOlghN1QjPU9uaSomUF9HWG1zVz1UPCdMaiplRy9FPkMySEJcSnFLaVhOTEozOFBwVyo5QztjRCg/IS5NOjRLJCgpNj8lJyduTG8uQ0gsW25IcCsvNyNUPjMrNiw2Iy4jbkZUNVA2Llk5MGFUJiMuKixLcC88Z0plJTEpIU9fK3FuR0IvbkI8aWIxdVQhRUdHMSozYi9XaFBcVVpVXkMpRkBMPFxSSy4nLl0+P0xqJS9HLUQmcSQjPlZAL1swcEA/cWQ4NkhLLVkrWSg+byY3ajw9b0tIKDlqQVdWRC1FdG06UTBDVjpGZzsrX2ZyJUU0aDNMUjlpIj5DRG5kbSJmIiI/ND00UDFxZik4Jk1nY1lzKS1hXSZPYlRzbVVVaTBySG9ScTI4OyQmZ1B1ak9YdUUhS2YpTC00R1NbNjsuKzhnJXNNLlNAdVZzTjUnZjYjLz1BT15MK1grPSlaXlIrNWFmdTslImQ8QVlJRUlCMS4hZ11acz5CMW5tLihuTWpALSxbc01dX1RHLz1haGQ5bzwmM0FbI2UvUz9cTG9NRmlgMlBHLS1BPClaW0xcM2lXaGtPJi47KXQibG1wQFNZV19bJkotRVpmZG1cc2wySikrNy50NUxPYmA7USQ3UUVEV1woTSxdT1sxLy9PMENsLWRcMk8+dW0lbG4rOmIuXy9GZmhAZVdgMT5KK3UzWT1kMSFkWDVDRkInZStAZjZxZ0BHIU4+bDtkSW5iRWEkS3IwYm09YWNYOT81MD1kYi1SREkkOjshZ0JhPiUoPkZkI14lPz45aDE2SUo5KkFZZSUoSGpcREw9PUtATG9nMkQqN3FNUyxDLDxQWlNjIUlATXFrNW9vcjBVdU1VKm42Xz1HSCE9WFddM1IuO0RncT4kYnUwSlNnLi9XTj1lNjxnRiYkIzxMVl5ubShXWzsvbDRaPlU6KzckPzVyaDtCYEk1QW9HbylDLGBFZ3FTVT9lcElrUU5oXW9KJWVsO15SOzY6ZTxGTSlIKTpeal48UF0zQ0FnVDdnbCtQV1BpWlZPX21VbVdORTgvPj9KSUU9aVdGP0swbltPPXBrSSdMZTJaY3RcVUsqPi1mVStdTnAzKls9aU4oYDJdZDVMJisrVV1aLSVacUwyRmZWRlRNPmxVbz5OVlxIV3M3cFRPPS9xPG5jXXVsYiY9NEMrRVQ+KlRQPSs+b10vVWhxT3BaZUVmNWhvZFFHLS09ITJKNSg1Lkw3VUV1IlM1VF5iNitjUUo0aistWXAnTGdpY0pAKW9vaDVwO1c+cTg+dUdWVSpcNFQzVyUxYHEhOTFHaGE8LVA4XXNbQSkhbEliXiVJS0BuX09uLzs0TSMwIlt0PyM4cnEuIzo1OzcxQSM4Y3AqRytVIUxYLS4yKzVFY0peVy1gSGo4TSZPLVBBUzZvWys/WFBlXzFNPFJZYlxFTVNyM2dMRGpZV0FJL0UhNDY9WVMtUTBWaS1kUjdPUm8yJi9xIidAcVVgZ3JfL2UvZUZhKFldciY2YyMvdEliYiElSktpLU4zTFsiYzYxSzJgdWtKakQ7I1xAKWpWWG5dc1JlXS1SMC9KT2k8SkQqakshIWxMQUU+XUBJQjpgQExSVUZRLjY8WHBDcVBNOk8zSlUnSzVvPScxLydDdTJ1XDRrWDVyQ0pgaCtAUUZWNzc/JzI9WyJXYjckJGdsXUBVSWNCQWRhLERHcDBEIWgnLzpHX0dFRkxWX3JQYyhfOCsuK14xN0E0Pl04My9tXnMqIVovQzVXOTtqJls1ZW0mUkYtLkNnYjpHK1tAYyVpMi4jXz1fQ1JHWVR1VCVwMWpdMzJNM2VYTi1rQjVIQEJMcjBPck1KYixOaC1RKUxQK0UnckwhLSRNb2ciWCZdbzNZOkJBWl8uNWBuNENOImZpOXBMQjNpOkYmYVxNSHBAWGMxYV1rNkYkVFQkcCElYjVrMVRcZmhgbjYwZGRyOldmYD06MXFwVDA7MkNVVGQ+NlhMLHJXPXUnUFNNb0dacTRdLU1LPFs4NFg9ZS01LCw3LlhrUGJyLWkjJkhkKHJbJz4sYzxSJF8nVEJHNzFlbWlEWGM7W0VrKig0a2k/PyY9RjElLW1vIiE+R19SYDA7XXFOZG1mSmJSQzswKF8+XXBeakU/bk1SIjJtRTczZzJTLztQWGBVXChucGNcT2E8MyZoXi9gYGZ0b0JeaSJFQV0mLEU9IVFwUCwwMyxkKjlMZ0NnSCFcV1UjIk81dF1hNShzSGJdRidwMnAmMW1sPFIpLV11LUFdNihgc2lNI3JCXzVpaCFTUUoxTWgmI0xqTU1yZyJELSpXMGpVOjlKSjkjaGhuOyIobVQ3NVZET0c1WHBkYztNTzBxWnJBQCQsYDBiXVNLZy1gSipnNEhTaXRZSTFaRiFdVFlUUSxwbzgvPkBdVEU3bV1aalVWaDYwOzooXik7LTVfPzgoQCcnOnBzNyJsVyxcXTkpb15wcyQqIkZraC1GZ1cuTGxrYjRVXWAuT0IoPWlRY3Q6RD0sUzNZVF1AOSQnby5IKGQ+ZWdGLTpiYllZVzVGWVw/XmUsamtnQGsvSjlDZixLLF9WZjVzSihKXE5bZzFFWTclV2x0US1EWWwxOzMoTilrWilqNVJMX1U0Uz88am82PFIiZFIyZTA5XkQwV2IvIzFfQF4rYiFYQk5WKHIycys7Qmg0NT4yVGFFP3JQLE4kOCUoJS5SbT89NDdeRllBPkhBITBsTSdebXA3NyVncUZtPUVicFU6IUEvNkxbM2RxQiJqVlxAQDdcNTJMOCVPNTNLI2QmZ1g1Jz5UV0VLTz89bnM9X2FXOSwqXW5IWzxXbWlSYzcoOjU3JD1zSUM0Kz9fUiVrVys0ay0xSjttUC9QQXFpaCdcSSdxXGtMPCw7akosSWNOYWw+QltiOG1YbSptc08oXGlxOWVCbytwaW1wMEZUKWwrIUJOMVErK1wtKjw0RG9qNURKRlNxR3RMJz0iMSRIb0JtMTVFJUdNZCRkWFNybmpmNjAibUduPSgxT01AKyosU1EkJlpdM19YR2wpUjBGZzc7QixeRTwwMUA4UiVOSydqWyw7LSp1O19cbS1IQDhVbyh0dENzOUEqUTdnOThOZFVkX1FSc2pAI1ZmRlpjSnFDdGtiQi5SQV5oR0Q3bF1TJTwhcGNeLzc3YkladFsySyZsPSc2MDRxXD5nKW8yL2VgTzxAaC5zSzpdOVxTb2tNITdTJGJgSEtFMTtlVnBWbjN0bCs7L1E2Mm1HdGVGci8nS0EoWyQ6dHFRLCVyMVJASzchcCwyb3NsbCNQbCk8RGloYGMlY1JSL11VZUdOZkBVbFttRFdibk4hTycsW1lgaklOIT04OjNDcWgwSCRfN18xZSsyLXE2RF5KU15zMjBVJFdSUUJKbzY6JHNGLGBgVHBtTTVucTo4VV03ay4/bk4hREMlWClsM2snJUZyZHNeQGRfIjkyX1M3Zm9IZU80U3JaXlJdPVc1Y14oWDc2Ims5MnFcU1Q4aTVDS04oQD8xbzI/LT9mIzY9JSsmaSMsPjNua2VdJC5qYU9DOHAkVWJkUSZxP0liWFc+MSdJZStXaUxVVVktNGQmZjo8XURtPDhbPFhILykobWMmaCxiMlNoWkNIO2tYQ21LY0BROGQ5NyshdUZiZzM+UVpnYCNNa1NTRF1vQlZtX2VCZjImam9XXz01Ok8tJVtaNVFqSGZZNWEvVEckVT1vKi1baTYiV1Y/OVMzMEkxJydCdGtjIjxDJGxKNUJfI1xOUztfUyxiXVA9XjYuS2lrPmttZSJhPnEvNERSUG89WFQyWCJlTmpfKkJeMSluNV1SaVlcPGg1TSY+TkEkbUEjaGcpOVk4PWFUZzlLTTBxMlVQIUJeQV1BW1FKNy9PZ05JISxJTjA5J3VBJEIkdDM7LEF1KVRmZE8iQW5CLDdcLjlucDJgXFYlI0BgdF9pKj9eZTw9PWRnOypKJzYnYFkuQjhDQCNcIS1GS1o3X0hfJmJbIS9TTCxKIjo8J2A5NjIyOk5qRT07W0RJPF5wJkAnblUwMGkqbmdyMUJxK0hlQ0k8L1Q7LlZgYydKNio6ZkIpRVcwYStPblVOYDglLjVCWVdwSTRuWTRYWm9nVWJISChPQ3FGWlBASS09L15baEpaKUBVUGxuUUcoPC4/bFlQQ0VSXlpGXnR+PmVuZHN0cmVhbQplbmRvYmoKMTQgMCBvYmoKPDwKL0ZpbHRlciBbIC9BU0NJSTg1RGVjb2RlIC9GbGF0ZURlY29kZSBdIC9MZW5ndGggMjEyNQo+PgpzdHJlYW0KR2F0bTs/JEZhVyY6TyNOUighTkAmXz1HKURlNEpfbG42WDpmbVYjJEUoayYtQGklM1UrMjw5LmpHdF00OF1zLSQnWlo9bSlWcXFbXSMsdTUwK1wqRy8jJFp0SE1XZDwoR3UuVz5WU1w9XlppYDhtKmNoIlZLY145UGFHIVhXWywiKEIvUSIuLzdHTTRTOTFXclloRzMkLy5wOzlDKCduLShiPlA8QWRAQEpcLV4vMi0zaU4qU2UkOWBfYjtDNDoyKzA/QzlkX3BBcSlbXG5ZTD5nQmA9LlZPLCJKLGJxJ15LcD42aEthdGY1aVg0WWQxampyaWVlI2paQiRbUS5xRmpbPHM5PnRxOF02L0ROcjZRMzdgSGYjJFBdRm1RT3R1QUkoO15FKWs0MEomK0JmJVxNO0FzdD0kLTMsXlY9c1pbdFs5cG9eNzA0X2hLSHVLQWYydUNoODdYazgzYSFuKiZjVTY0M1BOZVNCT0JgcjpEXFE8cTdtXlVTVV0yUjo+SUptXWE2ZGthXi8tRG0uUjZwMFIuYltlXmVXWTlNK0FoKV9IJWNLK1xiU25fT0pFWWZAaDAkRG03WCIpUURoKiUjKFJsbGFpXWdmY2I3cy1qZC9KK1UxUG0pTi9FLD1KXypLY11zIzllMW1DZUdCNytqcEtFbT5ySVEzSWo5Nkx0YGwpQDRtcnFWODNCTm5lYl0+ZTs6R0kzZl1UOzNyZkdvcEJxNCdqcE5IZHQnPTZCWjZsREgvIS5sJ1lfZUxISkxLN0EkIU1HOVM1R2gvbVUqKmluI0tkLDUtTypmMy0iNV50QDptRUBWNEBbYTM3QyRFXlVeIkNZRTNKT05CKGRcRS0zQ0twIkknI0gvbkQiImkrOFhPcjMjJ09OSklWJiJZYV8vKyFmaktHLkFWPWlLJjVTXjFDW3QnNiZzWiVGYDtiY04ncCRXKTNaTjlcYVVGdG9xPWErSGBVQnUzaTtwVHFvVixSISRgU0QxVTZCaFsxUkdfTXMqRWRwW1s5WFA0azVIXDNzYGhDRVduJzVNOFQhNmdTTj9sLy0lVyFBXG9ma0NcQGhnKnJWYE44KTw8VVxTVEA9THRiWWthbEJFL0ZXcCJxLjwhP2kwOisoRlIkOU5lKCJNTyRtJ15UTkInSXRNNTVFajdIcUBkLC1aITI7XXJxYlNZXGsiMjBXW1AzYidJQCNHNkxZRTtHTyszSDt1TGhlQDBNOV9RX0xbMDYiOjVsPmteZmpZdGRsJTZGUjRURDg7Li9BPjI4Uy1mJCMuV0svKEJGMWY8Y2VxX2ptdC41TT9SKDtJMUliKFk0WmwkZjJhUEE1NT5mc1MiI2s3XmJKJWZjRVAkImRibEFcN1VfVkZrPmUsbUUmPz4uSEA0JDI/UUgmPjQsRT1oK1MqKSlsZ1woSUQ3W0hRVTdYLEo3OCQ4VFBHJnV1Wz5McHQxQ2kzRyE0aT1XW1NnVUlRLGRTOC9LVG01XyIzTURgWTJIKFtiXTlLQ00rSUIhSVtHYU00PjpEUEIjYSJval0oJk8ocSc6Xm06K3AkXT5INGNtOFU+PSxSUk9NTGRZXlZeUmIzP3EvQycxM2IpMyVIQ0I1PFhQVUojS1xLY1dYQ11oV2wqVFM7ZjlXPiRhOihXYyZpMisqRUM4WlphbkpkIXBqQU9IQ1g9MiZqNypzMSh0amVIVDdnQ3ErRUtIKCxvTGZxOi9gRk9mNk9ra29fNTIxYXNuSV9DISJmJEhCNFtRMElgYC5DY1puOS8kPUo2R1xEajFicVJVUidDZ1dkaiMrKiJfaTExXGFyUm9NVGpnXUtNRSRUUTsqVDZdKjxBVSIic25tYmQhMEw8cFMwYyUiZjJBTnJRR00hRWo+VzNMLGFkRTlJIkI3QmwpaUBDNFJWXm4tPEFYMyFPM1s0a1RCX0lpXkxHXm9rX3RZRkRiSUdiPGVLP1slQ3QhSzlLRk9XJVhDUCk2NGomYF9uWyNgL2VsQjVlQGVmamNIV09GNCNGQWouMy4kQz90MjQ2SV8iK1FNcllxYlFEWS1BLC5ZWUYhZUo/TWRlVyc3KXFkJUlBUDc2a2M9RTdoIzRaLjM/QGwzLnNAQSlTdC9mSj1AbyledFVnSy8+RTYuJUtmdGc1LExYO04lXEJnS1MicVtcPyxXJ29XZkttOjU/OFJDYCZkTmBwb2goOF1nVjMtclBvdUJxamdrYTtgM2BqYGpqUC45XGFDU04+bC1kX2tjcV5FU2ctODw7YGhCIjFial51I0orMW1eZkZTYW1GWFtALldvNzUvLDU7MGkhMDY/V1stQUE3ak9CUjo2TVFeU0MpPVpyMllAUDg4Y18zcjc4WCxII19Lb2RrWEYkLiEnLS8tNmxuWDhdai1cLSlDS3MmNSMkYWVeVlYtT1FrO09vJTNsUVRcJ2w4dTBgUVk4Q0olXmlGV1ZzVGM1SF0xTzAvcHNvWGhXY0E0KFFacE5acGZbKVUncERRXiYmKDBdS2QnbF41NjteI2JjVXVSUkdhPylARzJrPEo8TnIqQiUyTG1jO1ZlMGtmQDhCakRIdDZnLz45cUlPIT8ubUlORDcuJ05nR0tgPlZzKzg/WXFtdCxXXz0lXnM9OUZLbUwjOG1qVmx1K0VEMSdaXz9EciNePmJQV1dvSSQiN2siUVRRaiNDPUlfXlA2PlkoRzhjQzU3UCZdXCV1JVJwY0NnKFpfJ2FgbWFybGonK0orb2QvPXJXNjllOUJfJz1eNilkNWwjLmBURSMtUS0ucTk4bnA0NC5eXmlVNC8naVdGZyJnIzNVODwpYmQ+bSFsRypVKVh+PmVuZHN0cmVhbQplbmRvYmoKeHJlZgowIDE1CjAwMDAwMDAwMDAgNjU1MzUgZiAKMDAwMDAwMDA2MSAwMDAwMCBuIAowMDAwMDAwMTQyIDAwMDAwIG4gCjAwMDAwMDAyNDkgMDAwMDAgbiAKMDAwMDAwMDM2MSAwMDAwMCBuIAowMDAwMDAwNDgwIDAwMDAwIG4gCjAwMDAwMDA1NjMgMDAwMDAgbiAKMDAwMDAwMDY3MiAwMDAwMCBuIAowMDAwMDAwNzQ5IDAwMDAwIG4gCjAwMDAwMDA5NTQgMDAwMDAgbiAKMDAwMDAwMTE1OSAwMDAwMCBuIAowMDAwMDAxMjI5IDAwMDAwIG4gCjAwMDAwMDE1MTAgMDAwMDAgbiAKMDAwMDAwMTU3NiAwMDAwMCBuIAowMDAwMDA0ODU0IDAwMDAwIG4gCnRyYWlsZXIKPDwKL0lEIApbPGMzMzhmNjZkYzVmZmM0MjI2YjVjMGZhYWRkMTc2MDM0PjxjMzM4ZjY2ZGM1ZmZjNDIyNmI1YzBmYWFkZDE3NjAzND5dCiUgUmVwb3J0TGFiIGdlbmVyYXRlZCBQREYgZG9jdW1lbnQgLS0gZGlnZXN0IChvcGVuc291cmNlKQoKL0luZm8gMTEgMCBSCi9Sb290IDEwIDAgUgovU2l6ZSAxNQo+PgpzdGFydHhyZWYKNzA3MQolJUVPRgo=";
const PDF_COMP = "JVBERi0xLjQKJZOMi54gUmVwb3J0TGFiIEdlbmVyYXRlZCBQREYgZG9jdW1lbnQgKG9wZW5zb3VyY2UpCjEgMCBvYmoKPDwKL0YxIDIgMCBSIC9GMiAzIDAgUiAvRjMgNCAwIFIgL0Y0IDUgMCBSIC9GNSA2IDAgUgo+PgplbmRvYmoKMiAwIG9iago8PAovQmFzZUZvbnQgL0hlbHZldGljYSAvRW5jb2RpbmcgL1dpbkFuc2lFbmNvZGluZyAvTmFtZSAvRjEgL1N1YnR5cGUgL1R5cGUxIC9UeXBlIC9Gb250Cj4+CmVuZG9iagozIDAgb2JqCjw8Ci9CYXNlRm9udCAvSGVsdmV0aWNhLUJvbGQgL0VuY29kaW5nIC9XaW5BbnNpRW5jb2RpbmcgL05hbWUgL0YyIC9TdWJ0eXBlIC9UeXBlMSAvVHlwZSAvRm9udAo+PgplbmRvYmoKNCAwIG9iago8PAovQmFzZUZvbnQgL0hlbHZldGljYS1Cb2xkT2JsaXF1ZSAvRW5jb2RpbmcgL1dpbkFuc2lFbmNvZGluZyAvTmFtZSAvRjMgL1N1YnR5cGUgL1R5cGUxIC9UeXBlIC9Gb250Cj4+CmVuZG9iago1IDAgb2JqCjw8Ci9CYXNlRm9udCAvWmFwZkRpbmdiYXRzIC9OYW1lIC9GNCAvU3VidHlwZSAvVHlwZTEgL1R5cGUgL0ZvbnQKPj4KZW5kb2JqCjYgMCBvYmoKPDwKL0Jhc2VGb250IC9UaW1lcy1Sb21hbiAvRW5jb2RpbmcgL1dpbkFuc2lFbmNvZGluZyAvTmFtZSAvRjUgL1N1YnR5cGUgL1R5cGUxIC9UeXBlIC9Gb250Cj4+CmVuZG9iago3IDAgb2JqCjw8Ci9Db250ZW50cyAxMSAwIFIgL01lZGlhQm94IFsgMCAwIDU5NS4yNzU2IDg0MS44ODk4IF0gL1BhcmVudCAxMCAwIFIgL1Jlc291cmNlcyA8PAovRm9udCAxIDAgUiAvUHJvY1NldCBbIC9QREYgL1RleHQgL0ltYWdlQiAvSW1hZ2VDIC9JbWFnZUkgXQo+PiAvUm90YXRlIDAgL1RyYW5zIDw8Cgo+PiAKICAvVHlwZSAvUGFnZQo+PgplbmRvYmoKOCAwIG9iago8PAovUGFnZU1vZGUgL1VzZU5vbmUgL1BhZ2VzIDEwIDAgUiAvVHlwZSAvQ2F0YWxvZwo+PgplbmRvYmoKOSAwIG9iago8PAovQXV0aG9yIChcKGFub255bW91c1wpKSAvQ3JlYXRpb25EYXRlIChEOjIwMjYwMzI1MTA0NDU0KzAwJzAwJykgL0NyZWF0b3IgKFwodW5zcGVjaWZpZWRcKSkgL0tleXdvcmRzICgpIC9Nb2REYXRlIChEOjIwMjYwMzI1MTA0NDU0KzAwJzAwJykgL1Byb2R1Y2VyIChSZXBvcnRMYWIgUERGIExpYnJhcnkgLSBcKG9wZW5zb3VyY2VcKSkgCiAgL1N1YmplY3QgKFwodW5zcGVjaWZpZWRcKSkgL1RpdGxlIChcKGFub255bW91c1wpKSAvVHJhcHBlZCAvRmFsc2UKPj4KZW5kb2JqCjEwIDAgb2JqCjw8Ci9Db3VudCAxIC9LaWRzIFsgNyAwIFIgXSAvVHlwZSAvUGFnZXMKPj4KZW5kb2JqCjExIDAgb2JqCjw8Ci9GaWx0ZXIgWyAvQVNDSUk4NURlY29kZSAvRmxhdGVEZWNvZGUgXSAvTGVuZ3RoIDMwMTkKPj4Kc3RyZWFtCkdiIWwhOTY5LE8nIys2RWkzSD9UV1duKTdKXEJhQTFaZEhmWG1CVzQjRUQyNlM8P0V1UCozcmJxSj8zWCJBNUlgM0R1XyhAdWorXWQ6YkFKNUNAXTQuM2U3U2g+YFshNj4nZyNyXlZobzZmVE9eIlZ0ZUwnPW8kUXItQ1tBKD1YYiwmUzw8OUp0cVcsVWshJzYrXXA2YE9ZZF1XNm4wSDItQidJMFdYTSU9JWtbMCU4Mz5vQTs8PSNdYlxIOC9TQ1ZqU0twPykkLCMmXU8nQmpuKjdmUCohbHVTYklMVzV0NXEicVhWMjpGTlJkL0NCcy5NPTk8Rjs2PTtTWWFPJVdOPjUyUlYoYm5TZV1wZlI4dGAqWHNXQmdzL2soVyRTRjpwN086VChOaHRbaHAka0NNLz85Q1hiNSc0Mz5GI09YMShaX15mZlVpYTBbI2ZkZGNzSl4oaCdgK0FeSU9vLUlSRV5fU0clUUVPc0lsYSM9T21vX09cK0lYUUpGaGpxJ0YrKV1IZXAlW1BHcUJqWEYuPWxfMGZZWE81Z29xPkpMX0E1cCQ2KHArQmg6XiJmUyI9Imw+ZjwhPkc8RCppIVx1XG4zTDVcYS82cSgsdCQjL2xEN2BSN2MiME9ZUyEqSCQ+azdDTDZCVkVKSS5UdVg9WFFzcUw9S2VkKGN0YyNNPTNmODFFXCs5QzVFI0E8T01YVEdoQHRVWl5tST5iTGAiYitAJzJJLz0jQmA/U0hzYVFIQ2o6MSc1NnFgTDpLKDRbP1NkZ1RnJlk0QHAiJTQ6Z2dpbyYwKEEtb2IkT3NiKzFEQkhFXmNhYTUmTDgxMlxNRGE3ZiUrQmtjUihDazByO2hzPy0tLTgxNz9tXCo+JWBpb1A6cHI4Ny5ebzpVLlQoU2syMTtjVShTMkZkTE9MNENUO2c/Ji1fJjJgcTo+U1YqLU9SQzFjQ0Y7LkJqLSdDNEJWSU8uSVZMKF0pJ2MiYF1GYEExWUpaPVkpT0FbdEtJKGdTXFkpOU4/MSNhbEY4U2slN1duUFUudWEnIi51Oy5xISdCalBBUkdOXlFgcmRqb1czWDZtSFhBTixPaDkwcCJoMXU6cSUxIjUiKVFEdCRDPGE4cUY6NUU/RFlbK1IoTlE9QiM5QVo4cyYkX1ImVTBkYSNgV1NjSlJBRF1OVFxkNCxbNk41Nm9WNUZeZHVmPVc5YEduMG8+UmpAWSRjc1AzUUpDWzwlc1xSL0t1bjZfbS09UitlPl8tZl5HL2FeQztkLjFCQzBbY3BUJldgWlBja1tlTSxoTzcqNFczZSE+IXVGS3UiITkpTF02T0pvPlhhO1s2MiNFL1JNUlBeTkU4R1NeLW8xTjgtQS1jX0s2L0E9UycpYy5MOUNIRyNpTDk1QW01US05dCJuYnVsaVBIZSgrPTZPQy5BbD45UVJUZ15daD5pUzBaQV5MVCoqPHMvW1FCU1YhX1ZPYmEwWkdCMzYyaic7XyYuXl1IW0koTyEyWWkxKyciQSxkVEUpI2lGa00mckREJ25fLkpgWkBIXTg1ci43XFFwRDNdNy4nMzdWMl07N0RUJUdlKChCR1s0QjUmSmgzXCJrY0JfT0FOcFFqMl5eaDEwYkRWa2xqSEoxLWlFaFlOJThDZUZpLUYhVDcmZGooI0EyZWd0UjRYUzJAPyQtP0wiL2RGZlEwPVZHUkIpP1ZXbVxYXTUhNzFRaVtdTj8hSyduK0JdMlpLND9kZyVTZ0ZnJCUmUFcyXFxtZkZBSVQ2WFNJKzExVzNaR0AocD4tZThccmxMUko3QSFVKllXVUghbDpbTl46OVxZZUxbYUVSbF4iLjAnKFsxK0hCSFA3JkxIPDpba24sc0MsSFYja0xRakZoPms+YV5UOTdGRkAhMk1WN2ZfQkYwIzZHMEMqJlBsbDYvTjZoOzdvM2hBcTZZRF89aEprVVI4O04iYWdiOCJ1JCZPPjcxND5wQiVgRFZZViwwTm9rTDxpOGsvIV50QzFmbSw9a1UtZ1k0QGNBc15RUC5gPSYoajYwWXA4KjwiXDNvXS8hRk9OPzVRXSEyQSs4JiNZWCNHUTBBTk46P2lmOjdZQWJiK25TbihoJWUqWWhJVXMxI05qQXNdXj8yLitrNVIwOyhxZUtYWmk6azMlJl1iMW1OOjtDNFV1JTNqcl9LdWlRJSRsaEJ1WmVJZjlNI1QyKVdMcCc1R2BoTEBOJCo7cHByWmZeVD4rXjpKMUxcZC9xV2I9VURPXktIX1VXRDtIYERvYE5XWS0/KDVjTGBFLz9YTSQ7bylGPCFAOypILHBxRXFOM3NpRGVsS1JGKjlvbiI/LWU+c0h0KUQvK2ZcVl5jWkU3RydcO3JJO0UiaHRGbjdicjxRbjVLPTU9U0FvbiUycD4/YDBWOzghU2A6cC5NXTIiYydAKFM/a3BjQVUhaytPbjJiY04wQyorOGZGPjk5a2lEXi5kS3FpQGg4J0BbVTYyRmt1O2hidFx0PS9sKl1fUzNpbHM4Sm5GaCY5VD5iKj5KRlpCKT4mNkNCN1hgVl8qL2VcMFJgUSk3RjZkRWdyKk5YPGZcaW5YVVZGQTFVJFVwUW1pNVFmazowaVZybExWdCJLKURubVYsKmpLcVBdPGBCRkZfM0cobFYtcWEwNlNETzZbdGQlJ3I2MnRpP0BSIl5RYUZGSCkqNjBQW2E6Ji5aTyFOVVA2bDBcbm9BQz4+Mj4zQDVFaFwsK0daTSpXaStbRy5hczhWIzJOQ1spNSw2XFdfKz47NEVnQVhJLG02ZUYhJG5mQURqblcqLTVZPi80anI7JlUyIUhjZihUVkJHUiJSRE9zS1MxK0smU0VnVlhDO0lgc2ZZQzZNUj1lcTJsYismZHJjVXQpZ0hILmlMUGxbLT9YQCNFPmBXZmBMO1cvOjRBVWtnKmY2YSVNJklHXG8mbSlwUkItZ0Y5TCNBMyEvXSonPWxgNGBSNGk5LkFncFE6N0ZwWEwqbCpER2JHaTAqUVJWYjpZXmFkcnBYUiteMlgjKj9dLFk0RjNATjU2U0FIb0pGYl0jKFU2ISgrZSIiKXFfIj9UQXIkbjJ1QnA8PSMwNGZqNzNDST9IPi9oIzNjQUBcV3FAdXFyMSRWYltoIkpPbmpdXUg3UGkuNHByaURQRD5DcT1WSHJxU09NWWFgQj8zVGBxVy1AXiJxcFBVPikiQSg+bUdza1VZVXRCYl8tP2RFZF1gQ0hUKzRUcWlLLENvXCh0NzBoO046Q28tQlhNXjw3KHNvMnNgPl8/Ii1MOS1EXSxdM1k0dERZTnE1aCwuZkdDdEluZGBbQy9DJVNaPWIuN1ZNdGBbQS0zW2d1OWAwW2peKickJ3BgZ21DZyxZKSxnbUkiSydeVm5lb2YoTUxYPyw0UklgP0luKnBZQS50V1tvKSdBIVhxVk0hV1ckXUdXK0NJWy1bOihhNCUuM0cucVk9ZEFvS10iQ0BxISJuJyFubmBXdGNyMHBUKz5NXCtJNmldKltgMFRHMFBLSTBlSk4xNSFIUTw9ZitIbTRkOVAhPlVDWShdNyMoTS4ySG9hYXBnVkJYTSkjYTslRjhkKS4oRi0uLk1YUGVmVEU/bSZxKnAtSShidUBMT2RVdE4oZG1VOG44RXJIcjxbKGEqQUlPSjhtcmhlUDRaSWVkWGAyXGw4RkN0JGxvSjxmWl81VyJ1X1RtKFxCOihgazxIZmZIQStPcWRQXEk4YWZrUCpLXTZbRFkyUCM5UGltIytUbUFmP01dczJaT2IvU0pyLzdVb3Q9R1hKSmRkRCohUy0sZkhxcSNvPD0kQl4xRjVbMytvaDlAMVE/MmJUSmFfcFxGWzwpNG5mPUsyQjFGOTUkc2dFaz47KmdPTkQpR251KCUnN1ZSXzQ6PUwjM0JuOW9TaSZqbi8wPjFQQi1EJzxTRFlXY24xOCooUk5tKScnVjxrLiRDOkhZa0g5cjlfTS9HYzomaWpbaV9nQ2BANy10TDAkai07T0pBJD4iLWRJU191fj5lbmRzdHJlYW0KZW5kb2JqCnhyZWYKMCAxMgowMDAwMDAwMDAwIDY1NTM1IGYgCjAwMDAwMDAwNjEgMDAwMDAgbiAKMDAwMDAwMDEzMiAwMDAwMCBuIAowMDAwMDAwMjM5IDAwMDAwIG4gCjAwMDAwMDAzNTEgMDAwMDAgbiAKMDAwMDAwMDQ3MCAwMDAwMCBuIAowMDAwMDAwNTUzIDAwMDAwIG4gCjAwMDAwMDA2NjIgMDAwMDAgbiAKMDAwMDAwMDg2NyAwMDAwMCBuIAowMDAwMDAwOTM2IDAwMDAwIG4gCjAwMDAwMDEyMTYgMDAwMDAgbiAKMDAwMDAwMTI3NiAwMDAwMCBuIAp0cmFpbGVyCjw8Ci9JRCAKWzw2ZjJmZjBlM2UyY2U1NjgxMzQwZGM1MDQ0OGM3ZmMwNj48NmYyZmYwZTNlMmNlNTY4MTM0MGRjNTA0NDhjN2ZjMDY+XQolIFJlcG9ydExhYiBnZW5lcmF0ZWQgUERGIGRvY3VtZW50IC0tIGRpZ2VzdCAob3BlbnNvdXJjZSkKCi9JbmZvIDkgMCBSCi9Sb290IDggMCBSCi9TaXplIDEyCj4+CnN0YXJ0eHJlZgo0Mzg3CiUlRU9GCg==";
const PDF_IMPA = "JVBERi0xLjQKJZOMi54gUmVwb3J0TGFiIEdlbmVyYXRlZCBQREYgZG9jdW1lbnQgKG9wZW5zb3VyY2UpCjEgMCBvYmoKPDwKL0YxIDIgMCBSIC9GMiAzIDAgUiAvRjMgNCAwIFIgL0Y0IDUgMCBSCj4+CmVuZG9iagoyIDAgb2JqCjw8Ci9CYXNlRm9udCAvSGVsdmV0aWNhIC9FbmNvZGluZyAvV2luQW5zaUVuY29kaW5nIC9OYW1lIC9GMSAvU3VidHlwZSAvVHlwZTEgL1R5cGUgL0ZvbnQKPj4KZW5kb2JqCjMgMCBvYmoKPDwKL0Jhc2VGb250IC9IZWx2ZXRpY2EtQm9sZCAvRW5jb2RpbmcgL1dpbkFuc2lFbmNvZGluZyAvTmFtZSAvRjIgL1N1YnR5cGUgL1R5cGUxIC9UeXBlIC9Gb250Cj4+CmVuZG9iago0IDAgb2JqCjw8Ci9CYXNlRm9udCAvWmFwZkRpbmdiYXRzIC9OYW1lIC9GMyAvU3VidHlwZSAvVHlwZTEgL1R5cGUgL0ZvbnQKPj4KZW5kb2JqCjUgMCBvYmoKPDwKL0Jhc2VGb250IC9TeW1ib2wgL05hbWUgL0Y0IC9TdWJ0eXBlIC9UeXBlMSAvVHlwZSAvRm9udAo+PgplbmRvYmoKNiAwIG9iago8PAovQ29udGVudHMgMTEgMCBSIC9NZWRpYUJveCBbIDAgMCA1OTUuMjc1NiA4NDEuODg5OCBdIC9QYXJlbnQgMTAgMCBSIC9SZXNvdXJjZXMgPDwKL0ZvbnQgMSAwIFIgL1Byb2NTZXQgWyAvUERGIC9UZXh0IC9JbWFnZUIgL0ltYWdlQyAvSW1hZ2VJIF0KPj4gL1JvdGF0ZSAwIC9UcmFucyA8PAoKPj4gCiAgL1R5cGUgL1BhZ2UKPj4KZW5kb2JqCjcgMCBvYmoKPDwKL0NvbnRlbnRzIDEyIDAgUiAvTWVkaWFCb3ggWyAwIDAgNTk1LjI3NTYgODQxLjg4OTggXSAvUGFyZW50IDEwIDAgUiAvUmVzb3VyY2VzIDw8Ci9Gb250IDEgMCBSIC9Qcm9jU2V0IFsgL1BERiAvVGV4dCAvSW1hZ2VCIC9JbWFnZUMgL0ltYWdlSSBdCj4+IC9Sb3RhdGUgMCAvVHJhbnMgPDwKCj4+IAogIC9UeXBlIC9QYWdlCj4+CmVuZG9iago4IDAgb2JqCjw8Ci9QYWdlTW9kZSAvVXNlTm9uZSAvUGFnZXMgMTAgMCBSIC9UeXBlIC9DYXRhbG9nCj4+CmVuZG9iago5IDAgb2JqCjw8Ci9BdXRob3IgKFwoYW5vbnltb3VzXCkpIC9DcmVhdGlvbkRhdGUgKEQ6MjAyNjAzMjUxMDQ0NTQrMDAnMDAnKSAvQ3JlYXRvciAoXCh1bnNwZWNpZmllZFwpKSAvS2V5d29yZHMgKCkgL01vZERhdGUgKEQ6MjAyNjAzMjUxMDQ0NTQrMDAnMDAnKSAvUHJvZHVjZXIgKFJlcG9ydExhYiBQREYgTGlicmFyeSAtIFwob3BlbnNvdXJjZVwpKSAKICAvU3ViamVjdCAoXCh1bnNwZWNpZmllZFwpKSAvVGl0bGUgKFwoYW5vbnltb3VzXCkpIC9UcmFwcGVkIC9GYWxzZQo+PgplbmRvYmoKMTAgMCBvYmoKPDwKL0NvdW50IDIgL0tpZHMgWyA2IDAgUiA3IDAgUiBdIC9UeXBlIC9QYWdlcwo+PgplbmRvYmoKMTEgMCBvYmoKPDwKL0ZpbHRlciBbIC9BU0NJSTg1RGVjb2RlIC9GbGF0ZURlY29kZSBdIC9MZW5ndGggMjkxNQo+PgpzdHJlYW0KR2IhI145NyxETyg+XGpoP3JzYFZfMD9XYFNXYyYzMTYlalc8ZDM3PyxqWzRXNm4wSkRbZV1UOyFQViJGWjVlIUJHJSpXOCFmLU5BcW5OQGEsNEo4KGhlOCJyV3MoUDY5K2JgS0VLQCc2IVxOOShiSmkvZDFRJkUwVGN0Q2A3S1AvJGFyZW8sR1VzKyxlay9kYjZdInFnJ3A5N0VgWUNrTzdKRlI0UE85NjVxblgvRWFxI1AmPFkjXTdCb1BKMFg/bVwjVWUtKVohN1MuIW0uVyc9SWpPNWlbLm80Z15YUSU9UiVZVC1WQjY9Ojc9WVBtV1ZRXkY+YWEkcUJETDhTZlYyL3U5bDNhcio4LFFVUjUwJzNOZ2JROEdbSlNxVWFhPl5FOjJtczksOTVSYiFfbEwiW1lrWiFlZyIuZzgicCw8Uyg7IXMtPWZ0UWxPRSclQk03RytVaCRdI1s3RlxpJjtJMSVzUjZzSEhAJj5JV2t0WUlddScpNSttLE9NcCdsQCYmJEBFLShsZzk9YVNZT0xUSyNEVy8sM0JkaHJcJGRaVEU3M1lQZzBDLlx1PGMybzpIIz0zVUVtbnROSGxOSTAoXWVOQlBxOXVeWHE0Z1paQUI+UV5IXGNUakBsUDBlInEnYD1DWGYtYj0oIkArK0RcTCZlKjo6bShyLyxIXGc/aFs/OmxwVy0jL0tiYVgkTz81cklJSm5cLV9oPFpxIXFnQlNEMGcjJ2xIKmRZLEhYJUVJX0w/cjlwQzBMW2ppJERJR0liYz8/WEo7JnEpOzJDQFpZPkNsP3MiaC44Y3FVK1FYJW1tYCVibXA6c0YnPTI1NnVXZHNzNS5AT0s0cGdAJWEuT09vXnUwPGBta0tKaE4zJlcjKUBQJkRbKiF0XllNPDFzKEFMMEVqKFY3Tio0PCdWcCdqIVZQbDhySmskMnRrWSNROThPWkphQVBbNXFAVEcxak1jKCctamhkLG5WN2UyS2RqIigwXG86J15kLz9iXyZ0czsnbzAzQl0xUEpIJytNN1lGOHVeN2RnZGlnR2lwKEgnOSEpNFA6PDdAO0IjVTktY0BqU0BRMT4+QVVgQC9ucVNLbXBAS2M7VCwpJjVvOF4iJE4oO1UuYVxVLmhdXHJyWDhqZDc5LFo0dSMjJ21jTmxsWTBgYSJgdDZJcWBCJU10RDAmM2o/Mi1hYS5cY2RDPmMnX2tPJGQ9OCVCLCY+aUtdUTdKUDRtLWJaaS1MXGk3X1tWcTs/RXQvUDQ/MVxAS2hPKyo6cj5GcHRFKE0wa1VsYFlGVF5jKC8zN19tNmVWREE6Jkk9Il9iY2ArYiJ0M0BacDVhWmQ2KFlhbFFlN1EiWmA8azgsX1o8cmhdWm5GTjMsWXAyQDopT3FqPF9WJDMhMm4iUDVBNWNHKmhycUo7ZnJWWEoxY29tbU9wQmxyW2MhLSdBbj0wZiMoPjtncFs0WE1BNVZGTFFEJGVWTzBvMlNgSjVUOlUrIU08ITlyJnRPS0dUPydFXlAsRSEoTGk/ZzUyQGdZPFlubyJzJD9zKGdAWzBvSykwWVtdMnBCdVRUYXEjQTw5S20kVVY0JlFDJTYrPVZGYnMqL2o9RWgxUz0iQUFvOCFyLl0xOlUmaUlfP2ZfQDtiZSxbRkFhOFhMZXMvU11sbEhnMSVaRElEZzAjL0M4W2c5Zy08OTlLXCpLMVNdZD8lYnEuMDVXMi1LWktGcE1BZTtcO3BJMWlAU2A9SUZfaVkqXzQ+TCUsbktXW000PmE6NEkmZEEwWkg6X1I5cj5kWShbR2Q2LDh1NThaQnFZMD4pXFc/SVklc2FQJVljQE8nRlktOlxTRS9vVmx1YyU2cWdjcldBViwpajlXP2Y0T3QxZm9zJ2YjbDkqXSpLaUpAbGgqSSJhRzF0JGAvZXIoM1RpKGsnUkxFITlbRG5zJ09sJk48Q2dPYz1KNiEoNTY1ZkommQlZlL3JtQkYubTtQO3Anb0w/cTA0SUs0RUhwPiRnXElMWkEyXUI9Ji0xPEYqMkhtajhaYCNGPjw1JWsucGlAMkErYjNsSl08XnItYy8wU2QlTzhuT0MmOygzWk5kXClUW0ZCYzc+J05kQUJQRXFGW0E7PWkkMS0xTlszQzVaMEk2MV87QTRkOy9IVT5JcHJDLio5bWlqUXA6XCw8bzNiL09mWE4rU3A+P1MtSSNpLDQsKz47NlxXRk5ac0UmNz9SPFtFZkJbVDQ6MT9IXjxLOm4kNywqblFQbm4qJzBIU2pSJkBjbyQnNT8rK15yWFM3PUlXRTpRY0w0LjYvVDVrL183RWxxaUBFSEZ0JSNgPGkpaztIOkFfYlMkNFNwUERKVlJBWDJdYDlHMV8mTFE4WmlxK29hayF1YlA3PClNTytjZzgpVjhzPVRKbGFncj5JdVhDVEY9X3QjdGYvWkVedCwmLk4xY3Utci5nPSxRKFFkTF9kcj9wQ2dmKDE+L1ZzZComMC1YNlBecmpnW0JWLWRkSyFua1onNDA/P1haU2VaPD9PKE8vMktxVy9wTCgtJCYiUkE3Kz9KPy9PWm11K1pbNU9YT05FPjgjPkJvTTVcWi43Pk9MbFVBSGJCPUUlLmgnS2kpW2hfRERDPy1MSUhzL0BDTz4pRm1POCgxRCRcUyhlbXI0T1B1TU5yP2ZxOmomWEQmLUZkbFw/czI5I0paR1k2JVVNVkomRC1zYENCMWBSMCtMRXRkOiRaNVg7TDZWZ1BdQmJeaThvMWMkQHBgUkY8VDlCM2ZTKmRCcj9vXmkySkNKOlpnX29cMS1UJTE0ZGIwRC1JcyQ7a2BmYmB0L3JcaUxZXTA/TiVFblxySm1COjJfI1ZVXVFMOj5DQVk/cHQ3I2ciWUg2UkohZSRBQ20mZCopTGRmZFJbQTpDIjF0LlxBQWtlOSVPYU4xXD4mJTM7QE5MTjdGSVBYciFGSy9QSWUkQThEQmk9OGVAVDlWZ0Z0OyRaVTlrdFhbWnAtKEdFRmJBWk5YVmBuK0QnUUdlaTMkN3JGNll0TitcOVwjLFw+bE5KN2YoUmtBVURmZkRkMycodGBLSkU4XSImaDhfYUdTQzNFJ2h1RWd1UWpBWGNiWiMvTzBRRGtNI2UsNjIscmhdSUxJJ3MmaFZeYDoxJUNVUD5OL0hkY3Q1SDRRJlFIbCFGRG4laDsyOj5Qb0tUdShDRHRHSjttZTwsZy5HZ0Q+UlJpKUZIWj5dTl4yQSwkOzs4R1RWKUlCPCZtKDtFIjg+am5QXVtZSyhtVF4hVkAlcDJpPU9uYDxhM3B0Jls2cFA1O2lkR0dLY1UncS9HTyZtNVlkdWZKWnBBRHVXRlk+TWxVXEZgYjtXb08/XCpyKiZDcUUoY1NCLyNAU1MjTGsiIURxdG0wVy5wJDA8KXNkIV4kK1pAL25NclUmWDtwP19QUEtLXj9eYWc2NDItI3IoVlhHNkRGPWNraEJhYU4wWHBVcGBJSDs4O0BOSTFLLWY2JCZ0ZzpKMi1ZLF82PzpvRjJZLnFjSERLbGwpIiMxdWVhaDwndU5vTlBgQ1BQXj9UZF08bFhWRU0uXjQzRnRxbUVtI0MqcVE3IStYP1Fwb1AlS00rVi9DImRHQCg7LFs1RCYzO2U5RGVnQE9xSVw4Tj5OcTI6Il4kU00lQFZUXkAxPiVBIVo7KllycWZkcTRQSUlkWStkQktZRVVmcVc7Sl4wO2pJVl9aUnEmcSpnMi81Py45WlZfNlcqQSRiMGhKPDYvTlphPXQxMU1AUlkzb21Mb1FhS0luQygjP2dgPV9eNmg3cyxzJ0hAW2s5UW5ALi8/bDBuPmMoP1ImL0gyUnNhPW1nc2tvXDw2bFowSyZlVTctMzVdSyY+bHJybCpfXzdUfj5lbmRzdHJlYW0KZW5kb2JqCjEyIDAgb2JqCjw8Ci9GaWx0ZXIgWyAvQVNDSUk4NURlY29kZSAvRmxhdGVEZWNvZGUgXSAvTGVuZ3RoIDk1NAo+PgpzdHJlYW0KR2F0JHViQXU7ayddJj9xRz1hVG1VOjlLI2ROa0JqJT0sS0cyTXIqYiUkbF0oSCR0K0VBSE84Kk1pUFc6NFAlJ2BrOFtiMydKQzZqR21TR1lfPTdbMmBaXmZRUD0uYjIpcFllK2RzcUldL0NjUVhfUHAsJko4LiIzXEJVaDYsWyohI1c/VStHJT5rYj9MI3UybFFsYjUzay8rU1AzIVo8KkdZMzJjTm1Da0s2WVc4blNoYGo4K2M0Jissbiw4LG1wNkQhImdVLiE4KTkyW0FmPzYpcjRiS2opQnBWcmwzI2luQ2ktKUQuUDQ9NjQ7PylRPEdhNypQQkNkL2ldNnA8JCdGMD8xMTs7NkpnYCc5WE1NczRFJmI5JCxGZWFtXE1hSF5ZLWQlMFZmbUsiWDdsVWFFal03bSNIUzUzLjA8Ry5AUzdBY2NWQ2UzSFQybiYiVypyVy8iQiw2NVBOY0szUWZZOTdiOWRbX0MxayxTbylOJE1OaSRCNl01J2BIQ2Z0WGtYODtEUjplOz9URl46a291cSk8Ijo+Yio/TVstKWYqSGUtL289cE0zOydcW1N0NDJjWi1eQV4odUpmQjgxR0s1KUVzMCVDWUdPNiQiXzhYTlw5SiRyRzxBclI+LFtkJUliT1ROIkxVZi1CW2JhLmkoOiEvb0lmKEI9ODojWWQ7S3NsaV5zPkAiImhXUGRrSEs9OVdaSXEtcSVTIlE7aideY2VmWEFfPXNPNTBUUyRYKVFeMkthQ0JlN1ZScTNidWRMcC5raiFdSzJBJWM3TT9MT2Y3am9NIk5Oa0xGWW1ARidSJk4ucVpuaWRRYFAsOEJKbFJ0RiFpKipkO24rMCEsXipkIjU7OyEhcVMncS4lUCRoIS1OLGNGV2JNVD5ASmVGKG85PThpc1g3QSVYZjpOJXJWbmMnUFwjVm46MmMnQVFPIjMoNWY2ZiJSL1JyNnBhO3FTQj9sUElQY0FIR2ZzayFWKGpJVy4lcywoNEhSN2xuQFZnN0NpMVdGWD1Xb0JOdHJmJyokWUpZRGNqLypgb0pYJF9sQHJgXC5Zb2VcQTZCRkZkVyg5PVcwUzkoYCE5NVRpbmQwZycqXlkqaV1HMG01VkpiKCwuPWY5WzIhQ2VRJiFUajVYSTg4PGNqKytyZW5mcFliQVNZSGEuUl8mJTZtTUtlQTZKSzBkOC1pVzskZzMzNCNedTVHQV8/PV41VWVwSXBSJDdkMDgkJ0dfUldsZURDVXFeSm0vUj8/IURBVDRWI34+ZW5kc3RyZWFtCmVuZG9iagp4cmVmCjAgMTMKMDAwMDAwMDAwMCA2NTUzNSBmIAowMDAwMDAwMDYxIDAwMDAwIG4gCjAwMDAwMDAxMjIgMDAwMDAgbiAKMDAwMDAwMDIyOSAwMDAwMCBuIAowMDAwMDAwMzQxIDAwMDAwIG4gCjAwMDAwMDA0MjQgMDAwMDAgbiAKMDAwMDAwMDUwMSAwMDAwMCBuIAowMDAwMDAwNzA2IDAwMDAwIG4gCjAwMDAwMDA5MTEgMDAwMDAgbiAKMDAwMDAwMDk4MCAwMDAwMCBuIAowMDAwMDAxMjYwIDAwMDAwIG4gCjAwMDAwMDEzMjYgMDAwMDAgbiAKMDAwMDAwNDMzMyAwMDAwMCBuIAp0cmFpbGVyCjw8Ci9JRCAKWzxiMzg2MTllZGQ3NTFkYjhkYmQyMjYzZmZjNWRiOTUxMT48YjM4NjE5ZWRkNzUxZGI4ZGJkMjI2M2ZmYzVkYjk1MTE+XQolIFJlcG9ydExhYiBnZW5lcmF0ZWQgUERGIGRvY3VtZW50IC0tIGRpZ2VzdCAob3BlbnNvdXJjZSkKCi9JbmZvIDkgMCBSCi9Sb290IDggMCBSCi9TaXplIDEzCj4+CnN0YXJ0eHJlZgo1Mzc4CiUlRU9GCg==";

function downloadPDF(b64, filename) {
  const bytes = atob(b64);
  const arr = new Uint8Array(bytes.length);
  for (let i = 0; i < bytes.length; i++) arr[i] = bytes.charCodeAt(i);
  const blob = new Blob([arr], {type: 'application/pdf'});
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url; a.download = filename; a.click();
  URL.revokeObjectURL(url);
}

const T = {
  es: {
    nav: { about:"Sobre nosotros", features:"Funcionalidades", pricing:"Precios", login:"Acceder", cta:"Solicitar demo" },
    hero: { tag:"Para centros de secundaria del País Vasco", h1a:"El bienestar del aula,", h1b:"en tus manos.", sub:"Klaizen ayuda a docentes, orientación y dirección a diagnosticar el clima emocional del aula, proponer intervenciones y medir su impacto. Todo de forma anónima y segura.", cta1:"Solicitar demo gratuita", cta2:"Ver cómo funciona" },
    roles: { title:"Diseñado para todos los perfiles del centro", items:[
      {icon:"👩‍🏫",role:"Tutores/as",desc:"Conoce el estado real de tu clase en minutos. Lanza intervenciones con un clic y mide si funcionan."},
      {icon:"🧭",role:"Orientación",desc:"Accede a diagnósticos anónimos por grupo. Detecta patrones y prioriza el apoyo de forma informada."},
      {icon:"🏫",role:"Dirección",desc:"Visualiza el bienestar de todo el centro. Exporta informes y toma decisiones basadas en datos reales."},
      {icon:"🧑‍🎓",role:"Alumnado",desc:"Comparte cómo te sientes en 3 minutos. Accede a actividades que te ayudan a crecer. Todo es anónimo."},
    ]},
    how: { title:"Un ciclo completo, de diagnóstico a mejora", steps:[
      {n:"01",title:"Check-in del alumnado",desc:"12 preguntas sobre motivación, bienestar, pertenencia, autoconfianza, relaciones y estrés. En 3 minutos, desde cualquier dispositivo."},
      {n:"02",title:"Diagnóstico del aula",desc:"Dashboard con 6 dimensiones, alertas suaves y evolución semanal. IA analiza el diagnóstico y propone acciones."},
      {n:"03",title:"Intervención recomendada",desc:"Klaizen propone actividades adaptadas al diagnóstico real. Listas para aplicar sin preparación extra."},
      {n:"04",title:"Actividad interactiva en clase",desc:"El alumnado completa la actividad dentro de la app. Ikigai, cartas al futuro, termómetro de grupo y más."},
      {n:"05",title:"Medición del impacto",desc:"Nueva medición tras la intervención. Comparativa antes/después y recomendación de seguimiento."},
    ]},
    dims: { title:"6 dimensiones del bienestar escolar", sub:"Medimos lo que importa, sin etiquetas clínicas.", items:[
      {e:"🔥",label:"Motivación",desc:"Energía y ganas de aprender"},
      {e:"💙",label:"Bienestar emocional",desc:"Estado emocional general"},
      {e:"🤝",label:"Pertenencia",desc:"Sentirse parte del grupo"},
      {e:"⭐",label:"Autoconfianza",desc:"Seguridad en las propias capacidades"},
      {e:"💬",label:"Relaciones",desc:"Clima interpersonal del aula"},
      {e:"🌀",label:"Estrés académico",desc:"Presión y carga percibida"},
    ]},
    privacy: { title:"Anónimo, seguro y educativo", items:[
      {icon:"🔒",t:"Datos 100% anónimos",d:"El profesorado solo ve resultados agregados del grupo, nunca individuales."},
      {icon:"📊",t:"No es diagnóstico clínico",d:"Klaizen es una herramienta educativa. No etiqueta ni sustituye al apoyo psicológico."},
      {icon:"🇪🇺",t:"RGPD compliant",d:"Todos los datos se almacenan en servidores europeos bajo la normativa vigente."},
      {icon:"🌐",t:"Bilingüe ES / EU",d:"Interfaz completa en castellano y euskera para todos los usuarios."},
    ]},
    cta_block:{title:"Empieza con tu centro hoy",sub:"Demo gratuita, sin compromiso. Te lo mostramos en 30 minutos.",btn:"Solicitar demo gratuita"},
    footer:{copy:"© 2025 Klaizen · Plataforma educativa para el bienestar del aula · País Vasco"},
  },
  eu: {
    nav:{about:"Guri buruz",features:"Funtzioak",pricing:"Prezioak",login:"Sartu",cta:"Demo eskatu"},
    hero:{tag:"Euskal Herriko bigarren hezkuntzako ikastetxeentzat",h1a:"Gelako ongizatea,",h1b:"zure eskuetan.",sub:"Klaizenk irakasleei, orientazioari eta zuzendaritzari gelako klima emozionala diagnostikatzen, esku-hartzeak proposatzen eta haien eragina neurtzen laguntzen die. Dena modu anonimoan eta seguruan.",cta1:"Demo doakoa eskatu",cta2:"Nola funtzionatzen duen ikusi"},
    roles:{title:"Ikastetxeko profil guztientzat diseinatuta",items:[
      {icon:"👩‍🏫",role:"Tutore/ak",desc:"Zure klasearen benetako egoera minutu gutxitan ezagutu. Esku-hartzeak klik batez abian jarri eta ea funtzionatzen duten neurtu."},
      {icon:"🧭",role:"Orientazioa",desc:"Taldekako diagnostiko anonimoak eskuratu. Ereduak detektatu eta laguntza lehenetsi modu informatuan."},
      {icon:"🏫",role:"Zuzendaritza",desc:"Ikastetxe osoko ongizatea ikusi. Txostenak esportatu eta benetako datuetan oinarritutako erabakiak hartu."},
      {icon:"🧑‍🎓",role:"Ikasleen",desc:"3 minututan nola sentitzen zaren partekatu. Hazten laguntzen dizuten jarduerak egin. Dena anonimoa da."},
    ]},
    how:{title:"Ziklo osoa, diagnostikotik hobekuntzara",steps:[
      {n:"01",title:"Ikasleen check-in-a",desc:"12 galdera motibazioa, ongizatea, kidetasuna, autokonfiantza, harremanak eta estresa buruz. 3 minututan, edozein gailutik."},
      {n:"02",title:"Gelako diagnostikoa",desc:"6 dimentsioko dashboard-a, ohartarazpen leunak eta aste-bilakaera. AAk diagnostikoa aztertu eta ekintzak proposatzen ditu."},
      {n:"03",title:"Gomendatutako esku-hartzea",desc:"Klaizenk benetako diagnostikoaren arabera egokitutako jarduerak proposatzen ditu. Prestaketa gehigarririk gabe aplikatzeko prest."},
      {n:"04",title:"Jarduera interaktiboa klasean",desc:"Ikasleek apparen barruan osatzen dute jarduera. Ikigai, etorkizuneko gutunak, talde-termometroa eta gehiago."},
      {n:"05",title:"Eraginaren neurketa",desc:"Esku-hartzearen ondorengo neurketa berria. Aurretik/ondoren konparazioa eta jarraipen-gomendioa."},
    ]},
    dims:{title:"Eskola ongizatearen 6 dimentsioak",sub:"Garrantzitsua dena neurtzen dugu, etiketa klinikorik gabe.",items:[
      {e:"🔥",label:"Motibazioa",desc:"Ikasteko energia eta gogoa"},
      {e:"💙",label:"Ongizate emozionala",desc:"Egoera emozional orokorra"},
      {e:"🤝",label:"Kidetasuna",desc:"Taldearen parte sentitzea"},
      {e:"⭐",label:"Autokonfiantza",desc:"Norberaren gaitasunekiko segurtasuna"},
      {e:"💬",label:"Harremanak",desc:"Gelako pertsona-arteko giroa"},
      {e:"🌀",label:"Estres akademikoa",desc:"Hautemandako presioa eta karga"},
    ]},
    privacy:{title:"Anonimoa, segurua eta hezigarria",items:[
      {icon:"🔒",t:"Datu %100 anonimoak",d:"Irakasleek soilik taldearen emaitza agregatuak ikusten dituzte, ez bakarkakoak."},
      {icon:"📊",t:"Ez da diagnostiko klinikoa",d:"Klaizen hezkuntza-tresna bat da. Ez du etiketatzen ez laguntza psikologikoa ordezkatzen."},
      {icon:"🇪🇺",t:"DBEO betetzea",d:"Datu guztiak indarreko araudiaren arabera Europako zerbitzarietan gordetzen dira."},
      {icon:"🌐",t:"Elebitasuna ES / EU",d:"Interfaze osoa gaztelaniaz eta euskaraz erabiltzaile guztientzat."},
    ]},
    cta_block:{title:"Hasi zure ikastetxearekin gaur",sub:"Demo doakoa, konpromiso gabe. 30 minututan erakutsiko dizugu.",btn:"Demo doakoa eskatu"},
    footer:{copy:"© 2025 Klaizen · Gelako ongizaterako hezkuntza-plataforma · Euskal Herria"},
  }
};

const DIMS_DATA=[
  {id:"motivacion",color:"#FF6B35",bg:"#FFF0EB"},
  {id:"bienestar",color:"#0891B2",bg:"#E0F7FA"},
  {id:"pertenencia",color:"#7C3AED",bg:"#F0EBFF"},
  {id:"autoconfianza",color:"#D97706",bg:"#FFFBEB"},
  {id:"relaciones",color:"#DC2626",bg:"#FFF0F0"},
  {id:"estres",color:"#059669",bg:"#ECFDF5"},
];

const QUESTIONS=[
  {id:1,dim:"motivacion",type:"emoji5",te:"¿Con cuánta energía y ganas llegas hoy a clase?",tu:"Ze energia eta gogorekin etortzen zara gaur klasera?"},
  {id:2,dim:"motivacion",type:"slider",te:"¿Cuánto te importa lo que estás aprendiendo esta semana?",tu:"Zenbateraino axola zaizu aste honetan ikasten ari zarena?",mne:"Nada",mxe:"Muchísimo",mnu:"Ezer ez",mxu:"Izugarri"},
  {id:3,dim:"bienestar",type:"emoji5",te:"¿Cómo te sientes emocionalmente hoy, en general?",tu:"Nola sentitzen zara emozionalki gaur, orokorrean?"},
  {id:4,dim:"bienestar",type:"chips",te:"¿Hay algo que te esté pesando hoy?",tu:"Ba al dago gaur pisatzen ari zaizun zerbait?",
    oe:["Cansancio","Nervios","Tristeza","Presión","Soledad","Confusión","Rabia","Nada especial","Alegría","Ilusión"],
    ou:["Nekea","Urduria","Tristura","Presioa","Bakardadea","Nahasmena","Haserrea","Ezer berezirik ez","Alaitasuna","Ilusioa"]},
  {id:5,dim:"pertenencia",type:"emoji5",te:"¿Sientes que encajas bien en este grupo?",tu:"Talde honetan ondo sartzen zarela sentitzen al duzu?"},
  {id:6,dim:"pertenencia",type:"slider",te:"¿En qué medida sientes que el grupo te apoya cuando lo necesitas?",tu:"Neurri batean sentitzen al duzu taldeak laguntzen zaizula behar duzunean?",mne:"Para nada",mxe:"Siempre",mnu:"Batere ez",mxu:"Beti"},
  {id:7,dim:"autoconfianza",type:"emoji5",te:"¿Cómo de seguro/a te sientes hoy en tus capacidades?",tu:"Zenbateraino sentitzen zara seguru gaur zure gaitasunetan?"},
  {id:8,dim:"autoconfianza",type:"open",te:"Escribe una cosa que sientes que se te da bien.",tu:"Idatzi ondo egiten duzula sentitzen duzun gauza bat.",
    phe:"Ej: escuchar, el dibujo, resolver problemas...",phu:"Adib.: entzutea, marrazketa, arazoak konpontzea..."},
  {id:9,dim:"relaciones",type:"chips",te:"¿Cómo están tus relaciones dentro del aula esta semana?",tu:"Nola daude zure harremanak gelan aste honetan?",
    oe:["Bien con todos/as","Tensión con alguien","Me siento ignorado/a","Hubo un malentendido","Me siento valorado/a","Conflicto sin resolver","Tranquilo/a","Distante"],
    ou:["Ondo denekin","Tentsio norbaitrekin","Baztertua sentitzen naiz","Gaizki-ulertu bat egon zen","Baloratua sentitzen naiz","Konpondu gabeko gatazka","Lasai","Urrun"]},
  {id:10,dim:"relaciones",type:"open",te:"¿Hay algo sobre las relaciones en el aula que quieras compartir? (opcional)",tu:"Ba al dago gelan harremanei buruz partekatu nahi duzun zerbait? (aukerakoa)",
    phe:"Puedes escribir lo que quieras, es anónimo...",phu:"Nahi duzuna idatz dezakezu, anonimoa da..."},
  {id:11,dim:"estres",type:"slider",te:"¿Cuánta presión o carga académica sientes esta semana?",tu:"Zenbat presio edo lan akademiko sentitzen duzu aste honetan?",mne:"Sin presión",mxe:"Mucha presión",mnu:"Presiorik ez",mxu:"Presio handia"},
  {id:12,dim:"estres",type:"chips",te:"¿Qué te genera más estrés ahora mismo?",tu:"Zer sortzen dizu estres gehien orain?",
    oe:["Los exámenes","Las notas","El tiempo","No entender la materia","Las expectativas","Las tareas","Nada","El futuro"],
    ou:["Azterketak","Notak","Denbora","Materia ez ulertzea","Itxaropenak","Lanak","Ezer ez","Etorkizuna"]},
];

const ESC_ES=[{v:1,e:"😔",l:"Muy bajo"},{v:2,e:"😐",l:"Bajo"},{v:3,e:"🙂",l:"Regular"},{v:4,e:"😊",l:"Bien"},{v:5,e:"🤩",l:"Genial"}];
const ESC_EU=[{v:1,e:"😔",l:"Oso baxua"},{v:2,e:"😐",l:"Baxua"},{v:3,e:"🙂",l:"Normala"},{v:4,e:"😊",l:"Ondo"},{v:5,e:"🤩",l:"Bikain"}];

const ACTS=[
  {id:"ikigai",icon:"🌀",te:"Ikigai del aula",tu:"Gelako Ikigaia",tye:"Autoconocimiento",tyu:"Autoezagutza",dur:"25 min",
   de:"Reflexiona sobre qué te gusta, qué se te da bien, qué necesita el mundo y qué puedes aportar.",
   du:"Hausnartu zer gustatzen zaizun, zer ondo egiten duzun, zer behar duen munduak eta zer eman dezakezun."},
  {id:"termometro",icon:"🌡️",te:"Termómetro del grupo",tu:"Taldeko termometroa",tye:"Cohesión",tyu:"Kohesioa",dur:"15 min",
   de:"Elige una palabra que describe cómo ves al grupo hoy. Se crea una nube colectiva.",
   du:"Aukeratu gaur taldea nola ikusten duzun deskribatzen duen hitz bat. Nube kolektibo bat sortzen da."},
  {id:"carta",icon:"✉️",te:"Carta a mi yo futuro",tu:"Gutuna nire etorkizuneko niri",tye:"Motivación",tyu:"Motibazioa",dur:"20 min",
   de:"Escribe desde tu yo de dentro de 6 meses: ¿qué lograste? ¿de qué te alegras?",
   du:"Idatzi 6 hilabeteren buruko zerorengandik: zer lortu duzu? Zergatik pozten zara?"},
  {id:"motores",icon:"⚡",te:"Mis 3 motores",tu:"Nire 3 motorrak",tye:"Motivación",tyu:"Motibazioa",dur:"10 min",
   de:"Identifica las tres cosas que más te impulsan ahora mismo. Se comparte en parejas.",
   du:"Identifikatu gaur bertan gehien bultzatzen zaituzten hiru gauzak. Bikoteka partekatu."},
];

const GRUPOS=[
  {id:"2ba",name:"2º Bach A",n:24,scores:{motivacion:2.9,bienestar:3.6,pertenencia:2.4,autoconfianza:2.8,relaciones:2.3,estres:3.9}},
  {id:"2bb",name:"2º Bach B",n:22,scores:{motivacion:3.4,bienestar:3.8,pertenencia:3.1,autoconfianza:3.2,relaciones:3.3,estres:3.3}},
  {id:"1ba",name:"1º Bach A",n:26,scores:{motivacion:3.7,bienestar:4.0,pertenencia:3.5,autoconfianza:3.5,relaciones:3.6,estres:2.9}},
  {id:"4a", name:"4º ESO A", n:28,scores:{motivacion:3.1,bienestar:3.3,pertenencia:3.0,autoconfianza:2.9,relaciones:2.8,estres:3.6}},
];

const SB={motivacion:2.9,bienestar:3.6,pertenencia:2.4,autoconfianza:2.8,relaciones:2.3,estres:3.9};
const SA={motivacion:3.6,bienestar:3.8,pertenencia:3.5,autoconfianza:3.3,relaciones:3.4,estres:3.1};

// ── Klaizen Logo SVG ──────────────────────────────────────────────────────────
function KlaizenLogo({size=32}){
  return(
    <svg width={size} height={size} viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <linearGradient id="kg1" x1="0" y1="0" x2="100" y2="100" gradientUnits="userSpaceOnUse">
          <stop offset="0%" stopColor="#FFB300"/>
          <stop offset="100%" stopColor="#FF5500"/>
        </linearGradient>
      </defs>
      {/* Rounded square base */}
      <rect x="4" y="4" width="92" height="92" rx="18" ry="18" fill="url(#kg1)"/>
      {/* White swoosh curve — bottom-left to top-right */}
      <path d="M 10 85 Q 30 60 55 45 Q 72 34 90 28" stroke="white" strokeWidth="12" strokeLinecap="round" fill="none"/>
      {/* Small white tail at bottom */}
      <path d="M 8 92 Q 20 80 35 72" stroke="white" strokeWidth="7" strokeLinecap="round" fill="none" opacity="0.7"/>
    </svg>
  );
}

function KlaizenLogoSmall({size=26}){
  return(
    <svg width={size} height={size} viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <linearGradient id="kg2" x1="0" y1="0" x2="100" y2="100" gradientUnits="userSpaceOnUse">
          <stop offset="0%" stopColor="#FFB300"/>
          <stop offset="100%" stopColor="#FF5500"/>
        </linearGradient>
      </defs>
      <rect x="4" y="4" width="92" height="92" rx="18" ry="18" fill="url(#kg2)"/>
      <path d="M 10 85 Q 30 60 55 45 Q 72 34 90 28" stroke="white" strokeWidth="12" strokeLinecap="round" fill="none"/>
      <path d="M 8 92 Q 20 80 35 72" stroke="white" strokeWidth="7" strokeLinecap="round" fill="none" opacity="0.7"/>
    </svg>
  );
}

const css=`
@import url('https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@400;500;600;700;800&display=swap');
*,*::before,*::after{box-sizing:border-box;margin:0;padding:0;}
html{scroll-behavior:smooth;}
body{font-family:'Plus Jakarta Sans',sans-serif;background:#fff;color:#1a1a2e;-webkit-font-smoothing:antialiased;}
button,textarea{font-family:'Plus Jakarta Sans',sans-serif;}
.nav{position:sticky;top:0;z-index:200;background:rgba(255,255,255,.96);backdrop-filter:blur(12px);border-bottom:1px solid #f0f0f0;padding:0 32px;height:64px;display:flex;align-items:center;justify-content:space-between;}
.nav-logo{font-size:21px;font-weight:800;color:#3a3a3a;letter-spacing:-.5px;display:flex;align-items:center;gap:10px;}
.nav-dot{display:none;}
.nav-links{display:flex;gap:26px;}
.nl{font-size:14px;font-weight:500;color:#555;background:none;border:none;cursor:pointer;}
.nl:hover{color:#1a1a2e;}
.nav-r{display:flex;gap:8px;align-items:center;}
.lang{padding:5px 11px;border-radius:6px;border:1.5px solid #e5e5e5;background:none;font-size:12px;font-weight:700;cursor:pointer;color:#666;transition:all .2s;}
.lang.on{border-color:#FF6B35;color:#FF6B35;background:#FFF0EB;}
.btn{display:inline-flex;align-items:center;gap:7px;padding:12px 24px;border-radius:10px;border:none;font-size:14px;font-weight:700;cursor:pointer;transition:all .18s;}
.bp{background:#FF6B35;color:white;}
.bp:hover{background:#e85a25;transform:translateY(-1px);box-shadow:0 6px 20px rgba(255,107,53,.3);}
.bo{background:white;color:#1a1a2e;border:2px solid #e5e5e5;}
.bo:hover{border-color:#1a1a2e;}
.bs{padding:9px 20px;font-size:13px;border-radius:8px;}
.bw{background:white;color:#FF6B35;}
.bw:hover{background:#fff8f5;}
.bg{background:#f5f5f5;color:#555;border:none;padding:9px 18px;border-radius:8px;font-size:13px;font-weight:600;cursor:pointer;transition:all .18s;}
.bg:hover{background:#eee;color:#1a1a2e;}
.hero{padding:80px 32px 72px;max-width:1100px;margin:0 auto;display:grid;grid-template-columns:1fr 1fr;gap:60px;align-items:center;}
.hero-tag{display:inline-block;padding:6px 16px;border-radius:999px;background:#FFF0EB;color:#FF6B35;font-size:13px;font-weight:600;margin-bottom:20px;}
.hero-h1{font-size:clamp(36px,5vw,56px);font-weight:800;line-height:1.08;letter-spacing:-1.5px;margin-bottom:18px;}
.hero-h1 span{color:#FF6B35;}
.hero-sub{font-size:16px;line-height:1.65;color:#555;margin-bottom:30px;max-width:480px;}
.hero-btns{display:flex;gap:12px;flex-wrap:wrap;}
.hv{background:linear-gradient(135deg,#fff8f5,#f0f4ff);border-radius:24px;border:1px solid #e8e8f0;padding:26px;box-shadow:0 20px 60px rgba(0,0,0,.06);}
.hcard{background:white;border-radius:14px;padding:18px;box-shadow:0 4px 16px rgba(0,0,0,.06);margin-bottom:10px;}
.hcard:last-child{margin-bottom:0;}
.hcard-lbl{font-size:10px;font-weight:700;letter-spacing:1px;text-transform:uppercase;color:#aaa;margin-bottom:10px;}
.mbars{display:flex;gap:5px;align-items:flex-end;height:52px;}
.mbar{flex:1;border-radius:4px 4px 0 0;}
.mbar-l{font-size:9px;color:#aaa;text-align:center;margin-top:3px;}
.pdot{display:inline-block;width:8px;height:8px;border-radius:50%;background:#22c55e;margin-right:5px;animation:pd 1.5s ease-in-out infinite;}
@keyframes pd{0%,100%{opacity:1;}50%{opacity:.3;}}
.sf{padding:80px 32px;background:#f8f8fa;}
.s{padding:80px 32px;max-width:1100px;margin:0 auto;}
.stag{font-size:11px;font-weight:700;letter-spacing:1.5px;text-transform:uppercase;color:#FF6B35;margin-bottom:10px;}
.sh{font-size:clamp(26px,4vw,40px);font-weight:800;letter-spacing:-.8px;margin-bottom:10px;line-height:1.15;}
.ssub{font-size:15px;color:#666;max-width:540px;line-height:1.6;margin-bottom:44px;}
.rg{display:grid;grid-template-columns:repeat(4,1fr);gap:18px;}
.rc{padding:26px;border-radius:20px;border:1.5px solid #f0f0f0;transition:all .25s;background:white;}
.rc:hover{border-color:#FF6B35;transform:translateY(-3px);box-shadow:0 10px 28px rgba(255,107,53,.1);}
.ri{font-size:30px;margin-bottom:12px;}
.rn{font-size:15px;font-weight:800;margin-bottom:7px;}
.rd{font-size:13px;color:#666;line-height:1.55;}
.stg{display:grid;grid-template-columns:repeat(5,1fr);gap:16px;}
.stc{padding:22px;border-radius:16px;background:white;border:1px solid #f0f0f0;}
.stn{font-size:12px;font-weight:800;color:#FF6B35;margin-bottom:10px;}
.stt{font-size:14px;font-weight:700;color:#1a1a2e;margin-bottom:7px;line-height:1.3;}
.std{font-size:12px;color:#666;line-height:1.5;}
.dg{display:grid;grid-template-columns:repeat(3,1fr);gap:14px;}
.dc{padding:20px;border-radius:14px;display:flex;gap:12px;align-items:flex-start;border:1.5px solid #f0f0f0;transition:all .2s;}
.dc:hover{transform:translateY(-2px);box-shadow:0 6px 20px rgba(0,0,0,.06);}
.de{font-size:26px;flex-shrink:0;}
.dl{font-size:14px;font-weight:700;margin-bottom:2px;}
.dd{font-size:12px;color:#888;}
.pg{display:grid;grid-template-columns:repeat(4,1fr);gap:18px;}
.pc{padding:22px;border-radius:16px;background:#f8f8fa;border:1px solid #f0f0f0;text-align:center;}
.pi{font-size:26px;margin-bottom:10px;}
.pt{font-size:14px;font-weight:700;margin-bottom:5px;}
.pd2{font-size:12px;color:#666;line-height:1.5;}
.ctab{background:linear-gradient(135deg,#FF6B35,#ff4500);border-radius:26px;padding:60px;text-align:center;margin:0 32px 80px;}
.ctab h2{font-size:clamp(26px,4vw,40px);font-weight:800;color:white;margin-bottom:10px;letter-spacing:-.8px;}
.ctab p{font-size:15px;color:rgba(255,255,255,.85);margin-bottom:28px;}
footer{background:#1a1a2e;padding:28px;text-align:center;}
footer p{font-size:12px;color:#555;}
.panel{position:fixed;inset:0;z-index:300;background:rgba(0,0,0,.5);backdrop-filter:blur(4px);display:flex;align-items:stretch;justify-content:flex-end;animation:fi .2s ease;}
@keyframes fi{from{opacity:0;}to{opacity:1;}}
.sheet{width:min(500px,100%);background:#f8f8fa;overflow-y:auto;display:flex;flex-direction:column;animation:si .25s ease;}
@keyframes si{from{transform:translateX(100%);}to{transform:translateX(0);}}
.ah{background:white;border-bottom:1px solid #eee;padding:14px 20px;display:flex;align-items:center;justify-content:space-between;position:sticky;top:0;z-index:10;}
.alogo{font-size:17px;font-weight:800;color:#3a3a3a;display:flex;align-items:center;gap:7px;}
.adot{display:none;}
.atabs{display:flex;gap:3px;background:#f5f5f5;padding:3px;border-radius:7px;}
.atab{padding:6px 14px;border-radius:5px;border:none;font-size:12px;font-weight:600;cursor:pointer;background:transparent;color:#888;transition:all .2s;}
.atab.on{background:white;color:#1a1a2e;box-shadow:0 1px 3px rgba(0,0,0,.1);}
.xbtn{width:30px;height:30px;border-radius:50%;border:none;background:#f5f5f5;cursor:pointer;font-size:15px;display:flex;align-items:center;justify-content:center;}
.xbtn:hover{background:#eee;}
.ab{padding:18px;flex:1;}
.card{background:white;border:1px solid #eee;border-radius:14px;padding:20px;margin-bottom:14px;animation:up .3s ease forwards;}
@keyframes up{from{opacity:0;transform:translateY(8px);}to{opacity:1;transform:translateY(0);}}
.ey{font-size:10px;font-weight:700;letter-spacing:1.2px;text-transform:uppercase;color:#FF6B35;margin-bottom:5px;}
.ch{font-size:18px;font-weight:800;color:#1a1a2e;margin-bottom:5px;line-height:1.25;letter-spacing:-.3px;}
.cb{font-size:12px;color:#666;line-height:1.55;}
.pt2{height:3px;background:#f0f0f0;border-radius:3px;overflow:hidden;margin:12px 0;}
.pf{height:100%;background:#FF6B35;border-radius:3px;transition:width .5s ease;}
.eg{display:grid;grid-template-columns:repeat(5,1fr);gap:5px;margin:14px 0;}
.eb{display:flex;flex-direction:column;align-items:center;gap:4px;padding:11px 3px;border-radius:11px;border:1.5px solid #eee;background:#fafafa;cursor:pointer;transition:all .18s;}
.eb:hover,.eb.on{border-color:#FF6B35;background:#FFF0EB;}
.ee{font-size:22px;}
.el{font-size:9px;color:#aaa;text-align:center;font-weight:500;}
.cpg{display:flex;flex-wrap:wrap;gap:6px;margin:12px 0;}
.cp{padding:6px 13px;border-radius:999px;border:1.5px solid #eee;background:#fafafa;font-size:11px;color:#666;cursor:pointer;transition:all .18s;}
.cp:hover,.cp.on{border-color:#FF6B35;background:#FFF0EB;color:#FF6B35;font-weight:500;}
textarea{width:100%;background:#fafafa;border:1.5px solid #eee;border-radius:9px;padding:11px;color:#1a1a2e;font-size:12px;resize:none;outline:none;transition:border .2s;line-height:1.5;}
textarea:focus{border-color:#FF6B35;}
textarea::placeholder{color:#ccc;}
input[type=range]{width:100%;height:4px;-webkit-appearance:none;background:linear-gradient(90deg,#FF6B35 var(--v,50%),#eee var(--v,50%));border-radius:4px;outline:none;cursor:pointer;}
input[type=range]::-webkit-slider-thumb{-webkit-appearance:none;width:17px;height:17px;border-radius:50%;background:#FF6B35;box-shadow:0 0 0 3px #FFF0EB;}
.slbl{display:flex;justify-content:space-between;font-size:10px;color:#aaa;margin-bottom:7px;}
.sv{text-align:center;font-size:24px;font-weight:800;color:#FF6B35;margin-top:7px;}
.acts{display:flex;gap:8px;justify-content:flex-end;margin-top:16px;flex-wrap:wrap;}
.dv{height:1px;background:#f0f0f0;margin:14px 0;border:none;}
.dr{margin:12px 0;}
.drw{display:flex;align-items:center;gap:7px;margin-bottom:8px;}
.drl{font-size:10px;width:100px;flex-shrink:0;color:#666;font-weight:500;}
.drb{flex:1;height:5px;background:#f0f0f0;border-radius:5px;overflow:hidden;}
.drf{height:100%;border-radius:5px;transition:width .7s ease;}
.drv{font-size:10px;font-weight:700;width:26px;text-align:right;flex-shrink:0;}
.mg{display:grid;grid-template-columns:1fr 1fr;gap:9px;margin:12px 0;}
.mc{padding:13px;border-radius:11px;border:1px solid #f0f0f0;}
.ml{font-size:9px;font-weight:700;letter-spacing:.8px;text-transform:uppercase;color:#aaa;margin-bottom:3px;}
.mv{font-size:24px;font-weight:800;}
.mt{font-size:10px;color:#aaa;margin-top:2px;}
.sem{display:flex;align-items:flex-start;gap:9px;padding:10px 13px;border-radius:9px;font-size:11px;line-height:1.45;border:1px solid;margin-bottom:6px;}
.sd{width:7px;height:7px;border-radius:50%;flex-shrink:0;margin-top:2px;}
.alrt{display:flex;gap:8px;padding:11px 13px;border-radius:9px;font-size:11px;align-items:flex-start;margin:7px 0;background:#FFFBEB;border:1px solid #fde68a;color:#92400e;}
.stps{display:flex;align-items:center;margin-bottom:18px;gap:0;overflow-x:auto;padding-bottom:2px;}
.sti{display:flex;align-items:center;gap:4px;flex-shrink:0;}
.stc2{width:22px;height:22px;border-radius:50%;display:flex;align-items:center;justify-content:center;font-size:10px;font-weight:700;border:1.5px solid #eee;color:#aaa;background:white;transition:all .3s;}
.stc2.done{background:#22c55e;border-color:#22c55e;color:white;}
.stc2.active{background:#FF6B35;border-color:#FF6B35;color:white;}
.stl{font-size:10px;color:#aaa;white-space:nowrap;}
.stl.active{color:#1a1a2e;font-weight:700;}
.sln{width:14px;height:1.5px;background:#eee;flex-shrink:0;}
.sln.done{background:#22c55e;}
.dsc{text-align:center;padding:34px 14px;}
.di{font-size:48px;margin-bottom:12px;}
.dh{font-size:20px;font-weight:800;margin-bottom:5px;}
.ds{font-size:12px;color:#666;margin-bottom:20px;}
.acard{display:flex;gap:11px;padding:13px;border-radius:11px;border:1.5px solid #eee;background:#fafafa;cursor:pointer;transition:all .18s;margin-bottom:8px;align-items:flex-start;}
.acard:hover,.acard.on{border-color:#FF6B35;background:#FFF0EB;}
.aico{width:40px;height:40px;border-radius:9px;display:flex;align-items:center;justify-content:center;font-size:18px;background:white;flex-shrink:0;border:1px solid #eee;}
.at{font-size:13px;font-weight:700;margin-bottom:2px;}
.am{font-size:10px;color:#aaa;}
.tg{display:inline-block;padding:1px 7px;border-radius:999px;font-size:9px;font-weight:600;background:#f5f5f5;color:#888;margin:2px 2px 0 0;}
.cm{display:grid;grid-template-columns:1fr 1fr;gap:9px;margin:12px 0;}
.cb2{padding:14px;border-radius:11px;text-align:center;border:1px solid;}
.cl{font-size:9px;font-weight:700;letter-spacing:1px;text-transform:uppercase;color:#aaa;margin-bottom:5px;}
.cn{font-size:34px;font-weight:800;}
.grw{display:flex;align-items:center;gap:9px;padding:11px 13px;border-radius:9px;border:1px solid #f0f0f0;margin-bottom:7px;cursor:pointer;transition:all .18s;background:white;}
.grw:hover,.grw.on{border-color:#FF6B35;background:#FFF0EB;}
.gn{font-size:13px;font-weight:700;flex:1;}
.gnn{font-size:10px;color:#aaa;margin-right:10px;}
.gsc{font-size:12px;font-weight:700;}
.aib{background:linear-gradient(135deg,#fff8f5,#f0f4ff);border:1.5px solid #e8e0ff;border-radius:12px;padding:14px;margin:10px 0;}
.aih{display:flex;align-items:center;gap:6px;font-size:10px;font-weight:700;color:#7c3aed;letter-spacing:.8px;text-transform:uppercase;margin-bottom:7px;}
.ait{font-size:12px;color:#444;line-height:1.55;}
.exr{display:flex;align-items:center;justify-content:space-between;padding:11px 13px;border-radius:9px;border:1px solid #f0f0f0;margin-bottom:7px;background:white;}
.exl{font-size:12px;font-weight:600;}
.exm{font-size:10px;color:#aaa;}
.ikgrid{display:grid;grid-template-columns:1fr 1fr;gap:7px;margin:10px 0;}
.ikb{padding:11px;border-radius:11px;border:1.5px solid #eee;background:#fafafa;}
.ikt{font-size:9px;font-weight:700;letter-spacing:1px;text-transform:uppercase;margin-bottom:5px;}
.lp{background:#fafafa;border:1.5px solid #eee;border-radius:11px;padding:14px;}
.lh{font-size:11px;color:#aaa;margin-bottom:8px;font-style:italic;}
.cw{padding:6px 12px;border-radius:999px;font-size:12px;font-weight:500;animation:up .3s ease;display:inline-block;margin:2px;}
.tw{display:flex;flex-wrap:wrap;min-height:50px;padding:8px;border-radius:9px;border:1.5px dashed #eee;margin:10px 0;}
@media(max-width:900px){
  .hero{grid-template-columns:1fr;padding:48px 20px;}
  .hv{display:none;}
  .rg{grid-template-columns:1fr 1fr;}
  .stg{grid-template-columns:1fr 1fr;}
  .dg{grid-template-columns:1fr 1fr;}
  .pg{grid-template-columns:1fr 1fr;}
  .s{padding:56px 20px;}
  .sf{padding:56px 20px;}
  .ctab{padding:40px 22px;margin:0 16px 60px;}
}
@media(max-width:600px){
  .nav{padding:0 14px;}
  .nav-links{display:none;}
  .rg,.stg,.dg{grid-template-columns:1fr;}
  .pg{grid-template-columns:1fr 1fr;}
}
`;

// ── Activity components ──────────────────────────────────────────────────────
function IkigaiAct({l,done}){
  const [s,ss]=useState(0);
  const [d,sd]=useState({a:"",b:"",c:"",e:""});
  const B={
    es:[{k:"a",t:"Lo que me gusta",c:"#FF6B35",p:"¿Qué actividades o temas te apasionan?"},{k:"b",t:"Lo que se me da bien",c:"#DC2626",p:"¿En qué destacas? ¿Qué hacen bien según otros?"},{k:"c",t:"Lo que el mundo necesita",c:"#D97706",p:"¿Qué problemas del mundo te importan?"},{k:"e",t:"Por lo que me valorarían",c:"#7C3AED",p:"¿Qué habilidades tuyas podrían ser útiles para otros?"}],
    eu:[{k:"a",t:"Gustuko dudana",c:"#FF6B35",p:"Zer jarduera edo gai sutsutzen zaitu?"},{k:"b",t:"Ondo egiten dudana",c:"#DC2626",p:"Zertan nabarmentzen zara? Zer esaten dute besteek?"},{k:"c",t:"Munduak behar duena",c:"#D97706",p:"Zein arazo edo beharra kezkatzen zaitu munduan?"},{k:"e",t:"Balio izango nukeena",c:"#7C3AED",p:"Zein zure trebetasun baliagarri litzateke besteentzat?"}],
  };
  const bx=B[l]||B.es;
  if(s<4){const b=bx[s];return(<div>
    <div className="ey">{l==="eu"?`${s+1}. urratsa 4tik`:`Paso ${s+1} de 4`} · {b.t}</div>
    <div className="ch" style={{fontSize:15,marginBottom:8}}>{b.p}</div>
    <textarea rows={3} value={d[b.k]} onChange={e=>sd(p=>({...p,[b.k]:e.target.value}))} placeholder={l==="eu"?"Idatzi hemen...":"Escribe aquí..."}/>
    <div className="acts">
      {s>0&&<button className="bg" onClick={()=>ss(x=>x-1)}>{l==="eu"?"← Aurrekoa":"← Anterior"}</button>}
      <button className="btn bp bs" onClick={()=>ss(x=>x+1)} disabled={!d[b.k].trim()}>
        {s===3?(l==="eu"?"Ikigaia ikusi →":"Ver Ikigai →"):(l==="eu"?"Hurrengoa →":"Siguiente →")}
      </button>
    </div>
  </div>);}
  return(<div>
    <div className="ey">{l==="eu"?"Zure Ikigai pertsonala":"Tu Ikigai personal"}</div>
    <div className="ikgrid">{bx.map(b=><div key={b.k} className="ikb"><div className="ikt" style={{color:b.c}}>{b.t}</div><div style={{fontSize:11,lineHeight:1.45}}>{d[b.k]||"—"}</div></div>)}</div>
    <div className="alrt" style={{background:"#f0fdf4",borderColor:"#bbf7d0",color:"#166534"}}><span>💡</span><div>{l==="eu"?"Zure xedea lau eremu hauen gurutzaketan egon daiteke.":"Tu propósito puede estar en la intersección de estas cuatro áreas."}</div></div>
    <div className="acts"><button className="btn bp bs" onClick={done}>{l==="eu"?"Jarduera bukatu ✓":"Finalizar actividad ✓"}</button></div>
  </div>);
}

const TH={es:["🔥 Con energía","😴 Cansado/a","🤔 Pensativo/a","😰 Estresado/a","😊 Tranquilo/a","💪 Motivado/a","❄️ Desconectado/a","🌟 Ilusionado/a","🌪️ Revuelto/a"],
          eu:["🔥 Energiaz","😴 Nekatuta","🤔 Pentsatuta","😰 Estresatuta","😊 Lasai","💪 Motibatuta","❄️ Deskonektatuta","🌟 Ilusioz","🌪️ Nahasita"]};
const WCL=["#FF6B35","#0891B2","#7C3AED","#D97706","#DC2626","#059669"];

function TermAct({l,done}){
  const [ch,sc]=useState(null);
  const [ok,sok]=useState(false);
  const [cl,scl]=useState([{w:l==="eu"?"Energiaz":"Con energía",c:"#FF6B35"},{w:l==="eu"?"Lasai":"Tranquilo/a",c:"#0891B2"},{w:l==="eu"?"Motibatuta":"Motivado/a",c:"#059669"},{w:l==="eu"?"Ilusioz":"Ilusionado/a",c:"#7C3AED"},{w:l==="eu"?"Nekatuta":"Cansado/a",c:"#D97706"}]);
  const opts=TH[l]||TH.es;
  if(!ok)return(<div>
    <div className="ch" style={{fontSize:15,marginBottom:6}}>{l==="eu"?"Gaur taldea nola ikusten duzu?":"¿Una palabra: cómo ves al grupo hoy?"}</div>
    <div className="cb" style={{marginBottom:12,fontSize:11}}>{l==="eu"?"Anonimoki gehituko da gelako nubera.":"Se añadirá de forma anónima a la nube del aula."}</div>
    <div className="cpg">{opts.map(o=><div key={o} className={`cp ${ch===o?"on":""}`} onClick={()=>sc(o)}>{o}</div>)}</div>
    <div className="acts"><button className="btn bp bs" disabled={!ch} onClick={()=>{scl(c=>[...c,{w:ch.split(" ").slice(1).join(" "),c:WCL[Math.floor(Math.random()*WCL.length)]}]);sok(true);}}>
      {l==="eu"?"Nubera gehitu →":"Añadir a la nube →"}
    </button></div>
  </div>);
  return(<div>
    <div className="ey">{l==="eu"?"Gelako nubea · zuzenean":"Nube del aula · en vivo"}</div>
    <div className="ch" style={{fontSize:15,marginBottom:6}}>{l==="eu"?"Taldea gaur honela sentitzen da":"Así se siente el grupo hoy"}</div>
    <div className="tw">{cl.map((w,i)=><span key={i} className="cw" style={{background:w.c+"22",color:w.c,border:`1px solid ${w.c}44`,fontSize:`${11+Math.random()*5}px`}}>{w.w}</span>)}</div>
    <div className="alrt" style={{background:"#faf5ff",borderColor:"#e9d5ff",color:"#6b21a8"}}><span>🤔</span><div style={{fontSize:11}}>{l==="eu"?"Zer esaten dizu nube honek taldearen inguruan?":"¿Qué te dice esta nube sobre el grupo?"}</div></div>
    <div className="acts"><button className="btn bp bs" onClick={done}>{l==="eu"?"Hausnarketa osatu ✓":"Reflexión completada ✓"}</button></div>
  </div>);
}

function CartaAct({l,done}){
  const [s,ss]=useState(0);
  const [d,sd]=useState({a:"",b:"",c:""});
  const P={es:[{k:"a",t:"Tus logros futuros",p:"Imagina que han pasado 6 meses. ¿Qué has conseguido?",ph:"En estos 6 meses he conseguido..."},
              {k:"b",t:"Lo que habrás aprendido",p:"¿Qué habrás aprendido sobre ti mismo/a?",ph:"He aprendido que..."},
              {k:"c",t:"Un consejo para hoy",p:"¿Qué le diría ese 'yo futuro' al 'yo de ahora'?",ph:"Lo que te diría es..."}],
    eu:[{k:"a",t:"Etorkizuneko lorpenak",p:"Imajinatu 6 hilabete igaro direla. Zer lortu duzu?",ph:"Sei hilabete hauetan lortu dut..."},
        {k:"b",t:"Ikasiko duzuna",p:"Zer ikasiko duzu zeure buruari buruz?",ph:"Ikasi dut..."},
        {k:"c",t:"Gaurko aholkua",p:"Zer esango lioke 'etorkizuneko nik' 'oraingo niari'?",ph:"Esango nizkiokeen hitzak dira..."}]};
  const ps=P[l]||P.es;
  if(s<3){const p=ps[s];return(<div>
    <div className="ey">{l==="eu"?`${s+1}. urratsa 3tik`:`Paso ${s+1} de 3`} · {p.t}</div>
    <div className="ch" style={{fontSize:15,marginBottom:10}}>{p.p}</div>
    <div className="lp"><div className="lh">{l==="eu"?"6 hilabeteren buruko gutunetik...":"Carta de mi yo dentro de 6 meses..."}</div>
      <textarea rows={3} value={d[p.k]} onChange={e=>sd(x=>({...x,[p.k]:e.target.value}))} placeholder={p.ph} style={{background:"transparent",border:"none",borderBottom:"1px dashed #eee",borderRadius:0,padding:"6px 0"}}/>
    </div>
    <div className="acts">
      {s>0&&<button className="bg" onClick={()=>ss(x=>x-1)}>{l==="eu"?"← Aurrekoa":"← Anterior"}</button>}
      <button className="btn bp bs" onClick={()=>ss(x=>x+1)} disabled={!d[p.k].trim()}>
        {s===2?(l==="eu"?"Gutuna ikusi →":"Ver mi carta →"):(l==="eu"?"Hurrengoa →":"Siguiente →")}
      </button>
    </div>
  </div>);}
  return(<div>
    <div className="ey">{l==="eu"?"Zure gutun osoa":"Tu carta completa"}</div>
    <div className="lp"><div className="lh">{l==="eu"?"Nire oraingo niari...":"Querido/a yo..."}</div>
      <div style={{fontSize:12,lineHeight:1.65,color:"#444"}}>
        {d.a&&<p style={{marginBottom:8}}><em>{ps[0].t}:</em><br/>{d.a}</p>}
        {d.b&&<p style={{marginBottom:8}}><em>{ps[1].t}:</em><br/>{d.b}</p>}
        {d.c&&<p><em>{ps[2].t}:</em><br/>{d.c}</p>}
      </div>
    </div>
    <div className="acts"><button className="btn bp bs" onClick={done}>{l==="eu"?"Jarduera bukatu ✓":"Actividad completada ✓"}</button></div>
  </div>);
}

const MO={es:["Aprender cosas nuevas","Ayudar a otros","Sentirme capaz","Mis amigos/as","Mi familia","El deporte","La creatividad","El reconocimiento","Superarme","El futuro que imagino","La música / el arte","Sentirme libre"],
          eu:["Gauza berriak ikastea","Besteei laguntzea","Gai sentitzea","Nire lagunak","Nire familia","Kirola","Sormena","Aitorpena","Nire burua gainditzea","Imajinatu dudan etorkizuna","Musika / artea","Libre sentitzea"]};

function MotoresAct({l,done}){
  const [sel,ss]=useState([]);
  const [ok,sok]=useState(false);
  const motores=MO[l]||MO.es;
  const cols=["#FF6B35","#D97706","#7C3AED"];
  const tog=m=>ss(s=>s.includes(m)?s.filter(x=>x!==m):s.length<3?[...s,m]:s);
  if(!ok)return(<div>
    <div className="ch" style={{fontSize:15,marginBottom:5}}>{l==="eu"?"Orain bertan zer bultzatzen zaitu?":"¿Qué te mueve ahora mismo?"}</div>
    <div className="cb" style={{marginBottom:10,fontSize:11}}>{l==="eu"?"Aukeratu zehazki ":"Elige exactamente "}<strong style={{color:"#FF6B35"}}>3 {l==="eu"?"motor":"motores"}</strong>.</div>
    <div className="cpg">{motores.map(m=><div key={m} className={`cp ${sel.includes(m)?"on":""}`} onClick={()=>tog(m)}>{sel.includes(m)&&"⚡ "}{m}</div>)}</div>
    <div style={{textAlign:"center",fontSize:11,color:"#aaa",margin:"7px 0"}}>{sel.length}/3</div>
    <div className="acts"><button className="btn bp bs" disabled={sel.length!==3} onClick={()=>sok(true)}>{l==="eu"?"Motorrak ikusi →":"Ver mis motores →"}</button></div>
  </div>);
  return(<div>
    <div className="ey">{l==="eu"?"Zure 3 motorrak":"Tus 3 motores"}</div>
    {sel.map((m,i)=><div key={m} style={{display:"flex",alignItems:"center",gap:9,padding:"11px 13px",borderRadius:9,border:`1.5px solid ${cols[i]}33`,background:`${cols[i]}11`,marginBottom:7}}>
      <div style={{width:26,height:26,borderRadius:"50%",background:cols[i],display:"flex",alignItems:"center",justifyContent:"center",fontWeight:800,color:"white",fontSize:11,flexShrink:0}}>{i+1}</div>
      <div style={{fontSize:13,fontWeight:700}}>{m}</div>
    </div>)}
    <div className="alrt"><span>🤔</span><div>{l==="eu"?"Zure motorrengandik bat partekatu alboko norbaitekin.":"Comparte uno de tus motores con alguien de al lado."}</div></div>
    <div className="acts"><button className="btn bp bs" onClick={done}>{l==="eu"?"Jarduera bukatu ✓":"Actividad completada ✓"}</button></div>
  </div>);
}

function ActRunner({act,l,done}){
  if(!act)return null;
  if(act.id==="ikigai")return <IkigaiAct l={l} done={done}/>;
  if(act.id==="termometro")return <TermAct l={l} done={done}/>;
  if(act.id==="carta")return <CartaAct l={l} done={done}/>;
  if(act.id==="motores")return <MotoresAct l={l} done={done}/>;
  return null;
}

// ── Class roster (demo data) ──────────────────────────────────────────────────
const ROSTER = [
  "Aitana Fernández","Amaia Etxeberria","Aritz Gaztañaga","Beñat Zubiaurre",
  "Edurne Larrea","Ekhi Mendizabal","Garazi Aizpurua","Haritz Urrutia",
  "Iker Olazabal","Irene Castillo","Izaro Bengoa","Jon Iñaki Aguirre",
  "Julen Kortabarria","Leire Alonso","Lide Mujika","Maddi Arrieta",
  "Mikel Zabala","Nerea Bilbao","Oier Landa","Peru Goikoetxea",
  "Sara Vázquez","Unai Iriarte","Uxue Uribe","Ziortza Txapartegi",
  "Ainhoa Ruiz","Jokin Aperribay",
];

// Individual student history (demo data for teacher view)
const STUDENT_HISTORY = {
  "Aitana Fernández":   [{w:1,m:3.5,b:4.0,p:3.2,a:3.8,r:3.5,e:3.0},{w:2,m:3.2,b:3.8,p:2.8,a:3.5,r:3.0,e:3.4},{w:3,m:2.8,b:3.5,p:2.4,a:3.0,r:2.6,e:3.8},{w:4,m:2.5,b:3.2,p:2.0,a:2.8,r:2.2,e:4.2}],
  "Beñat Zubiaurre":    [{w:1,m:4.0,b:4.2,p:4.0,a:4.0,r:4.2,e:2.5},{w:2,m:3.8,b:4.0,p:3.8,a:3.8,r:4.0,e:2.8},{w:3,m:3.9,b:4.1,p:3.9,a:3.9,r:4.1,e:2.6},{w:4,m:4.0,b:4.2,p:4.0,a:4.0,r:4.2,e:2.4}],
  "Garazi Aizpurua":    [{w:1,m:2.5,b:2.8,p:2.2,a:2.5,r:2.0,e:4.5},{w:2,m:2.2,b:2.5,p:1.8,a:2.2,r:1.8,e:4.8},{w:3,m:2.0,b:2.2,p:1.5,a:2.0,r:1.5,e:5.0},{w:4,m:1.8,b:2.0,p:1.2,a:1.8,r:1.2,e:5.0}],
  "Mikel Zabala":       [{w:1,m:3.8,b:3.5,p:3.5,a:3.8,r:3.6,e:3.0},{w:2,m:3.6,b:3.4,p:3.2,a:3.6,r:3.4,e:3.2},{w:3,m:3.5,b:3.5,p:3.0,a:3.5,r:3.2,e:3.4},{w:4,m:3.4,b:3.4,p:2.8,a:3.4,r:3.0,e:3.6}],
};

function riskLevel(history){
  if(!history||!history.length) return "ok";
  const last = history[history.length-1];
  const avg = (last.m+last.b+last.p+last.a+last.r)/5;
  const trend = history.length>1 ? avg - (history[0].m+history[0].b+history[0].p+history[0].a+history[0].r)/5 : 0;
  if(avg<2.5||last.e>=4.5) return "high";
  if(avg<3.2||trend<-0.8) return "medium";
  return "ok";
}

// ── Alumno View ───────────────────────────────────────────────────────────────
function AlumnoV({l}){
  const [ph,sp]=useState("name");   // name | w | q | dc | act | dact
  const [student,setStudent]=useState(null);
  const [search,setSearch]=useState("");
  const [qi,sqi]=useState(0);
  const [ans,sa]=useState({});
  const [cur,sc]=useState(null);
  const [chips,sch]=useState([]);
  const [act,sa2]=useState(null);
  const isEs=l!=="eu";

  const filtered = ROSTER.filter(n=>n.toLowerCase().includes(search.toLowerCase()));
  const q=QUESTIONS[qi];
  const prog=((qi)/QUESTIONS.length)*100;
  const esc=l==="eu"?ESC_EU:ESC_ES;
  const qt=q?(l==="eu"?q.tu:q.te):"";
  const opts=q?(l==="eu"?q.ou:q.oe):[];
  const ph2=q?(l==="eu"?q.phu:q.phe):"";
  const dd=q?DIMS_DATA.find(d=>d.id===q.dim):null;
  const dti=q?DIMS_DATA.findIndex(d=>d.id===q.dim):-1;
  const dt=dti>=0?(l==="eu"?T.eu.dims.items[dti]:T.es.dims.items[dti]):null;
  const ok=q&&(q.type==="open"?true:q.type==="chips"?chips.length>0:cur!==null);
  function adv(){sa(p=>({...p,[q.id]:q.type==="chips"?chips:cur}));sc(null);sch([]);if(qi<QUESTIONS.length-1)sqi(i=>i+1);else sp("dc");}
  function reset(){sp("name");setStudent(null);setSearch("");sqi(0);sa({});sc(null);sch([]);sa2(null);}

  // ── Name select screen ──
  if(ph==="name") return(
    <div className="card">
      <div className="ey">Check-in · Klaizen</div>
      <div className="ch" style={{fontSize:18,marginBottom:4}}>
        {isEs?"¿Quién eres?":"Nor zara zu?"}
      </div>
      <div className="cb" style={{marginBottom:16,fontSize:12}}>
        {isEs
          ?"Busca tu nombre en la lista de clase. Tus respuestas son confidenciales y solo las verá tu tutor/a."
          :"Bilatu zure izena gela-zerrendan. Zure erantzunak konfidentzialak dira eta zure tutoreak bakarrik ikusiko ditu."}
      </div>

      {/* Search input */}
      <div style={{position:"relative",marginBottom:10}}>
        <span style={{position:"absolute",left:12,top:"50%",transform:"translateY(-50%)",fontSize:14,color:"#aaa"}}>🔍</span>
        <input
          type="text"
          value={search}
          onChange={e=>setSearch(e.target.value)}
          placeholder={isEs?"Escribe tu nombre...":"Idatzi zure izena..."}
          style={{width:"100%",padding:"11px 12px 11px 36px",border:"1.5px solid #eee",borderRadius:10,
            fontSize:14,fontFamily:"'Plus Jakarta Sans',sans-serif",outline:"none",
            transition:"border .2s",color:"#1a1a2e",background:"#fafafa"}}
          onFocus={e=>e.target.style.borderColor="#FF6B35"}
          onBlur={e=>e.target.style.borderColor="#eee"}
        />
      </div>

      {/* Name list */}
      <div style={{maxHeight:260,overflowY:"auto",display:"flex",flexDirection:"column",gap:5}}>
        {filtered.length===0
          ? <div style={{textAlign:"center",padding:"24px",color:"#aaa",fontSize:13}}>
              {isEs?"No encontrado. Pide ayuda a tu tutor/a.":"Ez da aurkitu. Eskatu laguntza zure tutoreari."}
            </div>
          : filtered.map(name=>(
            <button key={name} onClick={()=>{setStudent(name);sp("w");}}
              style={{
                display:"flex",alignItems:"center",gap:10,padding:"11px 14px",
                borderRadius:10,border:"1.5px solid #eee",background:"white",
                cursor:"pointer",textAlign:"left",transition:"all .18s",fontFamily:"'Plus Jakarta Sans',sans-serif",
              }}
              onMouseEnter={e=>{e.currentTarget.style.borderColor="#FF6B35";e.currentTarget.style.background="#FFF0EB";}}
              onMouseLeave={e=>{e.currentTarget.style.borderColor="#eee";e.currentTarget.style.background="white";}}
            >
              <div style={{width:32,height:32,borderRadius:"50%",background:"#f5f5f5",
                display:"flex",alignItems:"center",justifyContent:"center",
                fontSize:13,fontWeight:700,color:"#aaa",flexShrink:0}}>
                {name.charAt(0)}
              </div>
              <span style={{fontSize:14,fontWeight:500,color:"#1a1a2e"}}>{name}</span>
            </button>
          ))
        }
      </div>

      {/* Privacy note */}
      <div style={{marginTop:14,padding:"10px 12px",borderRadius:9,background:"#f8f8fa",border:"1px solid #eee",
        display:"flex",gap:8,alignItems:"flex-start"}}>
        <span style={{fontSize:13,flexShrink:0}}>🔒</span>
        <div style={{fontSize:11,color:"#888",lineHeight:1.5}}>
          {isEs
            ?"Tus respuestas son confidenciales. Solo tu tutor/a, orientación y dirección pueden ver tu evolución. Nunca se comparten con otros alumnos/as."
            :"Zure erantzunak konfidentzialak dira. Zure tutoreak, orientazioak eta zuzendaritzak bakarrik ikus dezakete zure bilakaera. Ez dira inoiz beste ikasleei partekatzen."}
        </div>
      </div>
    </div>
  );

  // ── Welcome ──
  if(ph==="w") return(
    <div className="card" style={{textAlign:"center",padding:"32px 20px"}}>
      <div style={{width:52,height:52,borderRadius:"50%",background:"#FFF0EB",border:"2px solid #ffd4c0",
        display:"flex",alignItems:"center",justifyContent:"center",fontSize:22,margin:"0 auto 14px"}}>
        {student?.charAt(0)}
      </div>
      <div className="ey" style={{display:"block"}}>Check-in · Klaizen</div>
      <div className="ch" style={{textAlign:"center",fontSize:19,marginBottom:6}}>
        {isEs?`Hola, ${student?.split(" ")[0]} 👋`:`Kaixo, ${student?.split(" ")[0]} 👋`}
      </div>
      <div className="cb" style={{textAlign:"center",marginBottom:5,fontSize:12}}>
        {isEs?"12 preguntas · 3 minutos · confidencial":"12 galdera · 3 minutu · konfidentziala"}
      </div>
      <div style={{display:"flex",justifyContent:"center",flexWrap:"wrap",gap:5,margin:"12px 0 22px"}}>
        {(l==="eu"?T.eu:T.es).dims.items.map((d,i)=><span key={i} style={{fontSize:10,padding:"3px 9px",borderRadius:999,background:DIMS_DATA[i].bg,color:DIMS_DATA[i].color,fontWeight:600}}>{d.e} {d.label}</span>)}
      </div>
      <div style={{display:"flex",gap:8,justifyContent:"center"}}>
        <button className="bg" onClick={()=>sp("name")}>{isEs?"← Cambiar nombre":"← Izena aldatu"}</button>
        <button className="btn bp bs" onClick={()=>sp("q")}>{isEs?"Empezar ✨":"Hasi ✨"}</button>
      </div>
    </div>
  );

  // ── Questions ──
  if(ph==="q") return(<div className="card">
    <div className="pt2"><div className="pf" style={{width:`${prog}%`}}/></div>
    {dd&&<div style={{display:"inline-flex",alignItems:"center",gap:5,padding:"2px 9px",borderRadius:999,background:dd.bg,color:dd.color,fontSize:10,fontWeight:700,marginBottom:9}}>{dt?.e} {dt?.label}</div>}
    <div style={{fontSize:10,color:"#aaa",marginBottom:9}}>{isEs?`Pregunta ${qi+1} de ${QUESTIONS.length}`:`${qi+1}. galdera ${QUESTIONS.length}tik`}</div>
    <div style={{fontSize:15,fontWeight:700,lineHeight:1.35,marginBottom:18}}>{qt}</div>
    {q.type==="emoji5"&&<div className="eg">{esc.map(e=><button key={e.v} className={`eb ${cur===e.v?"on":""}`} onClick={()=>sc(e.v)}><span className="ee">{e.e}</span><span className="el">{e.l}</span></button>)}</div>}
    {q.type==="slider"&&<div>
      <div className="slbl"><span>{isEs?q.mne:q.mnu}</span><span>{isEs?q.mxe:q.mxu}</span></div>
      <input type="range" min={1} max={5} step={1} value={cur||3} style={{"--v":`${(((cur||3)-1)/4)*100}%`}}
        onChange={e=>{const v=Number(e.target.value);sc(v);e.target.style.setProperty("--v",`${((v-1)/4)*100}%`);}} onClick={()=>{if(!cur)sc(3);}}/>
      <div className="sv">{cur||"—"}<span style={{fontSize:12,fontWeight:400,color:"#aaa"}}> / 5</span></div>
    </div>}
    {q.type==="chips"&&<div className="cpg">{opts.map(o=><div key={o} className={`cp ${chips.includes(o)?"on":""}`} onClick={()=>sch(s=>s.includes(o)?s.filter(x=>x!==o):[...s,o])}>{o}</div>)}</div>}
    {q.type==="open"&&<textarea rows={3} value={cur||""} onChange={e=>sc(e.target.value)} placeholder={ph2}/>}
    <div className="acts">
      {qi>0&&<button className="bg" onClick={()=>{sc(null);sch([]);sqi(i=>i-1);}}>{isEs?"← Anterior":"← Aurrekoa"}</button>}
      <button className="btn bp bs" onClick={adv} disabled={!ok} style={{opacity:ok?1:0.4}}>
        {qi===QUESTIONS.length-1?(isEs?"Finalizar →":"Bukatu →"):(isEs?"Siguiente →":"Hurrengoa →")}
      </button>
    </div>
  </div>);

  if(ph==="dc") return(<div className="card"><div className="dsc">
    <div className="di">🎉</div>
    <div className="dh">{isEs?"¡Check-in completado!":"Check-in osatu da!"}</div>
    <div className="ds">{isEs?`Gracias, ${student?.split(" ")[0]}. Tu tutor/a puede ver tu evolución de forma confidencial.`:`Eskerrik asko, ${student?.split(" ")[0]}. Zure tutoreak zure bilakaera konfidentzialki ikus dezake.`}</div>
    <div style={{background:"#FFF0EB",borderRadius:12,padding:"14px 16px",marginBottom:18,textAlign:"left"}}>
      <div style={{fontSize:10,color:"#FF6B35",fontWeight:700,letterSpacing:"1px",textTransform:"uppercase",marginBottom:7}}>{isEs?"Actividad de hoy":"Gaurko jarduera"}</div>
      <div style={{display:"flex",gap:9,alignItems:"flex-start"}}>
        <div style={{fontSize:22}}>⚡</div>
        <div>
          <div style={{fontWeight:800,fontSize:13,marginBottom:2}}>{isEs?"Mis 3 motores":"Nire 3 motorrak"}</div>
          <div style={{fontSize:11,color:"#aaa",marginBottom:9}}>10 min · {isEs?"Motivación":"Motibazioa"}</div>
          <button className="btn bp bs" onClick={()=>{sa2(ACTS.find(a=>a.id==="motores"));sp("act");}}>{isEs?"Hacer la actividad →":"Jarduera egin →"}</button>
        </div>
      </div>
    </div>
    <button className="bg" onClick={reset}>{isEs?"Volver al inicio":"Hasierara itzuli"}</button>
  </div></div>);

  if(ph==="act") return(<div className="card">
    <div className="ey">{isEs?act?.tye:act?.tyu} · {act?.dur}</div>
    <div className="ch" style={{fontSize:16,marginBottom:3}}>{act?.icon} {isEs?act?.te:act?.tu}</div>
    <div className="cb" style={{marginBottom:14,fontSize:11}}>{isEs?act?.de:act?.du}</div>
    <hr className="dv"/>
    <ActRunner act={act} l={l} done={()=>sp("dact")}/>
  </div>);

  if(ph==="dact") return(<div className="card"><div className="dsc">
    <div className="di">🌟</div>
    <div className="dh">{isEs?"¡Actividad completada!":"Jarduera osatu da!"}</div>
    <div className="ds" style={{marginBottom:18}}>{isEs?"Tu tutor/a verá el impacto en el próximo diagnóstico.":"Tutoreak eragina ikusiko du hurrengo diagnostikoan."}</div>
    <button className="btn bp bs" onClick={reset}>{isEs?"Volver al inicio":"Hasierara itzuli"}</button>
  </div></div>);
}

// ── Profe View ────────────────────────────────────────────────────────────────
const PSE=[{id:"d",label:"Diagnóstico"},{id:"a",label:"Áreas"},{id:"i",label:"Intervención"},{id:"ac",label:"Actividad"},{id:"im",label:"Impacto"}];
const PEU=[{id:"d",label:"Diagnostikoa"},{id:"a",label:"Eremuak"},{id:"i",label:"Esku-hartzea"},{id:"ac",label:"Jarduera"},{id:"im",label:"Eragina"}];

function StepsBar({cur,l}){
  const lst=l==="eu"?PEU:PSE;
  return(<div className="stps">{lst.map((s,i)=><div key={s.id} className="sti">
    <div className={`stc2 ${i<cur?"done":i===cur?"active":""}`}>{i<cur?"✓":i+1}</div>
    <span className={`stl ${i===cur?"active":""}`}>{s.label}</span>
    {i<lst.length-1&&<div className={`sln ${i<cur?"done":""}`}/>}
  </div>)}</div>);
}

function DimBars({scores,l}){
  const di=l==="eu"?T.eu.dims.items:T.es.dims.items;
  return(<div className="dr">{DIMS_DATA.map((d,i)=>{
    const sv=scores[d.id]||0;
    const pct=((sv/5)*100).toFixed(0);
    const c=sv<2.5?"#DC2626":sv<3.5?"#D97706":"#059669";
    return(<div key={d.id} className="drw">
      <div className="drl">{di[i]?.e} {di[i]?.label}</div>
      <div className="drb"><div className="drf" style={{width:`${pct}%`,background:c}}/></div>
      <div className="drv" style={{color:c}}>{sv.toFixed(1)}</div>
    </div>);
  })}</div>);
}

function AIBubble({l}){
  const [ld,sl]=useState(true);
  const [tx,st]=useState("");
  const tes="Basándome en el diagnóstico actual, detecto caída sostenida en pertenencia (-0.6 en 4 semanas) y relaciones bajas (2.3/5). El alumnado reporta tensión interpersonal. Recomiendo priorizar cohesión grupal esta semana. El 'Termómetro del grupo' sería efectivo ya que externaliza emociones colectivas sin señalar a nadie individualmente.";
  const teu="Egungo diagnostikoan oinarrituta, kidetasunean behera egonkorra detektatzen dut (-0,6 4 astetan) eta harremanak baxuak (2,3/5). Ikasleak tentsio interpertsonala aipatzen dute. Aste honetan talde-kohesioa lehenetsi gomendatzen dut. 'Taldeko termometroa' eraginkorra izango litzateke.";
  useEffect(()=>{const t=setTimeout(()=>{st(l==="eu"?teu:tes);sl(false);},1200);return()=>clearTimeout(t);},[l]);
  return(<div className="aib">
    <div className="aih"><span>✨</span>{l==="eu"?"AA-ren gomendioa":"Recomendación IA"}{ld&&<span style={{fontSize:10,fontWeight:400,color:"#aaa",marginLeft:5}}>{l==="eu"?"Aztertzen...":"Analizando..."}</span>}</div>
    {ld?<div style={{display:"flex",gap:5}}>{[60,80,50].map((w,i)=><div key={i} style={{height:7,borderRadius:4,background:"#eee",width:`${w}px`,animation:`pd ${.8+i*.2}s ease-in-out infinite`}}/>)}</div>:<div className="ait">{tx}</div>}
  </div>);
}

const PDF_DIAGNOSTICO = "JVBERi0xLjQKJZOMi54gUmVwb3J0TGFiIEdlbmVyYXRlZCBQREYgZG9jdW1lbnQgKG9wZW5zb3VyY2UpCjEgMCBvYmoKPDwKL0YxIDIgMCBSIC9GMiAzIDAgUiAvRjMgNCAwIFIKPj4KZW5kb2JqCjIgMCBvYmoKPDwKL0Jhc2VGb250IC9IZWx2ZXRpY2EgL0VuY29kaW5nIC9XaW5BbnNpRW5jb2RpbmcgL05hbWUgL0YxIC9TdWJ0eXBlIC9UeXBlMSAvVHlwZSAvRm9udAo+PgplbmRvYmoKMyAwIG9iago8PAovQmFzZUZvbnQgL0hlbHZldGljYS1Cb2xkIC9FbmNvZGluZyAvV2luQW5zaUVuY29kaW5nIC9OYW1lIC9GMiAvU3VidHlwZSAvVHlwZTEgL1R5cGUgL0ZvbnQKPj4KZW5kb2JqCjQgMCBvYmoKPDwKL0Jhc2VGb250IC9aYXBmRGluZ2JhdHMgL05hbWUgL0YzIC9TdWJ0eXBlIC9UeXBlMSAvVHlwZSAvRm9udAo+PgplbmRvYmoKNSAwIG9iago8PAovQ29udGVudHMgOSAwIFIgL01lZGlhQm94IFsgMCAwIDU5NS4yNzU2IDg0MS44ODk4IF0gL1BhcmVudCA4IDAgUiAvUmVzb3VyY2VzIDw8Ci9Gb250IDEgMCBSIC9Qcm9jU2V0IFsgL1BERiAvVGV4dCAvSW1hZ2VCIC9JbWFnZUMgL0ltYWdlSSBdCj4+IC9Sb3RhdGUgMCAvVHJhbnMgPDwKCj4+IAogIC9UeXBlIC9QYWdlCj4+CmVuZG9iago2IDAgb2JqCjw8Ci9QYWdlTW9kZSAvVXNlTm9uZSAvUGFnZXMgOCAwIFIgL1R5cGUgL0NhdGFsb2cKPj4KZW5kb2JqCjcgMCBvYmoKPDwKL0F1dGhvciAoXChhbm9ueW1vdXNcKSkgL0NyZWF0aW9uRGF0ZSAoRDoyMDI2MDMyNTIwMjcyNiswMCcwMCcpIC9DcmVhdG9yIChcKHVuc3BlY2lmaWVkXCkpIC9LZXl3b3JkcyAoKSAvTW9kRGF0ZSAoRDoyMDI2MDMyNTIwMjcyNiswMCcwMCcpIC9Qcm9kdWNlciAoUmVwb3J0TGFiIFBERiBMaWJyYXJ5IC0gXChvcGVuc291cmNlXCkpIAogIC9TdWJqZWN0IChcKHVuc3BlY2lmaWVkXCkpIC9UaXRsZSAoXChhbm9ueW1vdXNcKSkgL1RyYXBwZWQgL0ZhbHNlCj4+CmVuZG9iago4IDAgb2JqCjw8Ci9Db3VudCAxIC9LaWRzIFsgNSAwIFIgXSAvVHlwZSAvUGFnZXMKPj4KZW5kb2JqCjkgMCBvYmoKPDwKL0ZpbHRlciBbIC9BU0NJSTg1RGVjb2RlIC9GbGF0ZURlY29kZSBdIC9MZW5ndGggMTI2MAo+PgpzdHJlYW0KR2F1MEI5bEsmTSZBQDcuYllfW2hOKEFnJWFOX1B1NWdfMHBEMTBvZk9WZl9STTApPExhUjY4I09Lcl1FTTJhUlxgZVlxIWVCRThYXi45RWUlaDdFPSNCNy8oUnBSUj8jLTE3ZS43bXRAIm4jR25zJzN0LWNGZVppVjUsTl4hb0xjcyZuaCErIixZM2NkSzBeOSUuRCE3WUwiMlkzKjo8OlMsaiM7clYlKzksWVIxMWpGNExma1ZvOXVNXDhpQDIjKywjMXEmVXA0R0s6KT4kIjpdXDZkXyo1P1ZsLlolMUA8WD9PSm5nXjpwcycwZ1FaLz1BaCJCcGxwRzIsM1wwUVUjZVMlcGhXIyIoXW82IyFFJUtMZkghPUUkc3BoWVQvYygvTl1YMGw4QUtNKTJOSWpDI2EpYSlhVjJsLlAnQyRBMygnU3JdSTIpVFhvP1xCWTYvUkxsIiQuXSQxYidhKzIyOEspIUw0KzdvSytoYkM7RzdCTHFPb1lgZD49SXNPP2EmYlsyVSRzcldiPUo1UioiJm5fKl46ZV5OKXBRU1NudC8uLShPKU1JVG1kJ2JoNEEmT2kjaWs1VlowXkxzQl5ISHInP1lNJ25XP0UyVEx0VzNRVFtSOUNJW2c1a0owbWg5Vzo2XkE6TG84QF1dODlSSVgxZEBzLF9Dc08iWDBiIz5Ua2JyPFJLckFRSCFIR19hNkAuUU9JZm4rYioxJWBJUUAjXVtQdFZBTyVTVVgrNk5RNyVIK1wjQUZxVlxNREdUOUg6ZTNFUUJzLGtRWV9AT0lIZ2IiZCYvLl9yJWQtTkMjNktyOkBeJG9kSl47XWcrKSgySlopI3RtbERGVjVHZTtMJSxvVilaTFU2LyM1UkxBUW1VcDpyZms9NV8vISheJCFyJTdBY29KV2VCJVpmXUgiS3I5c1lqKkRmZTAkQyQmak9FLU1ZQC5kL3IsblFBaFw6P2xGMi1fUFE3PklCY0EjdCw3aG5YUT4jUzdzdF47cWBfISo2dScjZiJIU2NjSjc3TGQ3Ny5EJGtAMVkzOS41OS5EMWlfPW9rK2ZZJyJbcTVvIVxHLGtEc1JFKywnRUMnITNYWChVKlhjN29oOTMqW0xuVChvWWBKc11jXSdZV0pVSyY/WTFiXyksUT1fTW8tUz5sIiRuSm0xS2dkRDonMFYrZ2VcPkZVN2JrJjZ1REA/akZeJVZPbjExa0IiM1JVRmNHRTpeYDxROyRcSVZAXihnOUg1IiJaXDttNzZqXz5EZlVOaV1udUlAbVFcPGVlcCdNSF8mSUBKW0J0MSZxXk9dQ0EnJT9zY0ZgQiZOJCdhTERlT3IkVGdRMkYzV0o8KExGN3JIYlVwbVBQUlM/SDguTGgkW0IzLlI0V2wkNlBfTiZlWWZsZTE8bjA+O29mSTlkYV1OcE1qQENqXUBvPjQqTi1AKk0qY2dbWlExNF8tIl1gUj9sNyVZO1FkYDYvR1tiInJOQiM1Jl5uSUtKJVs1Um9NaGM0NVlYVFJBblAsWTgrVnJpI18uKjhvWXNdTzAvYltVJzdMaGYkZ0lUXEc4UlMiZVxfTF1hLjVyKkU+TGVSOTdTVikwO2NqXkxNPU91LWpGP209IzRZKC4zblJSN28qKTcoKGJuSEhCUlNSbCxrX1w4XlBXOCRyPHIxIyo2U34+ZW5kc3RyZWFtCmVuZG9iagp4cmVmCjAgMTAKMDAwMDAwMDAwMCA2NTUzNSBmIAowMDAwMDAwMDYxIDAwMDAwIG4gCjAwMDAwMDAxMTIgMDAwMDAgbiAKMDAwMDAwMDIxOSAwMDAwMCBuIAowMDAwMDAwMzMxIDAwMDAwIG4gCjAwMDAwMDA0MTQgMDAwMDAgbiAKMDAwMDAwMDYxNyAwMDAwMCBuIAowMDAwMDAwNjg1IDAwMDAwIG4gCjAwMDAwMDA5NjUgMDAwMDAgbiAKMDAwMDAwMTAyNCAwMDAwMCBuIAp0cmFpbGVyCjw8Ci9JRCAKWzw0MGIwZjljYjhmMTdjZTYxNWJhMTlkOWVmMjlkZDJhNT48NDBiMGY5Y2I4ZjE3Y2U2MTViYTE5ZDllZjI5ZGQyYTU+XQolIFJlcG9ydExhYiBnZW5lcmF0ZWQgUERGIGRvY3VtZW50IC0tIGRpZ2VzdCAob3BlbnNvdXJjZSkKCi9JbmZvIDcgMCBSCi9Sb290IDYgMCBSCi9TaXplIDEwCj4+CnN0YXJ0eHJlZgoyMzc1CiUlRU9GCg==";

function downloadPDF(b64, filename){
  // Use a data URI anchor rendered as a real click — works in sandboxed iframes
  const a = document.createElement("a");
  a.href = "data:application/pdf;base64," + b64;
  a.download = filename;
  a.target = "_blank";
  a.rel = "noopener";
  a.click();
}

function IndividualPanel({l}){
  const isEs=l!=="eu";
  const [search,setSearch]=useState("");
  const [selected,setSelected]=useState(null);

  const rosterWithRisk = ROSTER.map(name=>({
    name,
    history: STUDENT_HISTORY[name]||null,
    risk: riskLevel(STUDENT_HISTORY[name]||null),
    lastScore: STUDENT_HISTORY[name] ? (()=>{const last=STUDENT_HISTORY[name].at(-1);return ((last.m+last.b+last.p+last.a+last.r)/5).toFixed(1);})() : "—",
  }));

  const riskColor={high:"#DC2626",medium:"#D97706",ok:"#059669"};
  const riskLabel={
    high: isEs?"Riesgo alto":"Arrisku altua",
    medium: isEs?"Atención":"Arreta",
    ok: isEs?"Bien":"Ondo",
  };
  const riskBg={high:"#fef2f2",medium:"#FFFBEB",ok:"#f0fdf4"};

  const filtered=rosterWithRisk.filter(s=>s.name.toLowerCase().includes(search.toLowerCase()));
  const dimKeys=["m","b","p","a","r","e"];
  const dimLabels_es=["Motivación","Bienestar","Pertenencia","Autoconf.","Relaciones","Estrés"];
  const dimLabels_eu=["Motibazioa","Ongizatea","Kidetasuna","Autokonf.","Harremanak","Estresa"];
  const dimLabels=isEs?dimLabels_es:dimLabels_eu;
  const dimColors=["#FF6B35","#0891B2","#7C3AED","#D97706","#DC2626","#059669"];

  return(<div>
    {/* Risk alerts */}
    <div className="card">
      <div className="ey">{isEs?"ALERTAS INDIVIDUALES · 2º BACH A":"BANAKAKO ALERTAK · 2º BACH A"}</div>
      <div className="ch" style={{fontSize:17,marginBottom:4}}>{isEs?"Alumnado que necesita atención":"Arreta behar duten ikasleak"}</div>
      <div className="cb" style={{fontSize:11,marginBottom:14}}>
        {isEs?"Visible solo para tutor/a, orientación y dirección. Datos confidenciales.":"Tutoreari, orientazioari eta zuzendaritzari bakarrik ikusgai. Datu konfidentzialak."}
      </div>

      {/* High risk */}
      {rosterWithRisk.filter(s=>s.risk==="high").map(s=>(
        <div key={s.name} style={{display:"flex",alignItems:"center",gap:10,padding:"12px 14px",borderRadius:11,
          background:"#fef2f2",border:"1.5px solid #fecaca",marginBottom:8,cursor:"pointer"}}
          onClick={()=>setSelected(selected===s.name?null:s.name)}>
          <div style={{width:36,height:36,borderRadius:"50%",background:"#DC2626",color:"white",
            display:"flex",alignItems:"center",justifyContent:"center",fontWeight:800,fontSize:14,flexShrink:0}}>
            {s.name.charAt(0)}
          </div>
          <div style={{flex:1}}>
            <div style={{fontSize:13,fontWeight:700,color:"#1a1a2e"}}>{s.name}</div>
            <div style={{fontSize:11,color:"#DC2626",fontWeight:600}}>🔴 {riskLabel.high} · {isEs?"Media":"Batezbestekoa"}: {s.lastScore}/5</div>
          </div>
          <div style={{fontSize:11,color:"#DC2626",fontWeight:600}}>{isEs?"Ver evolución →":"Ikusi bilakaera →"}</div>
        </div>
      ))}

      {/* Medium risk */}
      {rosterWithRisk.filter(s=>s.risk==="medium").map(s=>(
        <div key={s.name} style={{display:"flex",alignItems:"center",gap:10,padding:"12px 14px",borderRadius:11,
          background:"#FFFBEB",border:"1.5px solid #fde68a",marginBottom:8,cursor:"pointer"}}
          onClick={()=>setSelected(selected===s.name?null:s.name)}>
          <div style={{width:36,height:36,borderRadius:"50%",background:"#D97706",color:"white",
            display:"flex",alignItems:"center",justifyContent:"center",fontWeight:800,fontSize:14,flexShrink:0}}>
            {s.name.charAt(0)}
          </div>
          <div style={{flex:1}}>
            <div style={{fontSize:13,fontWeight:700,color:"#1a1a2e"}}>{s.name}</div>
            <div style={{fontSize:11,color:"#D97706",fontWeight:600}}>🟡 {riskLabel.medium} · {isEs?"Media":"Batezbestekoa"}: {s.lastScore}/5</div>
          </div>
          <div style={{fontSize:11,color:"#D97706",fontWeight:600}}>{isEs?"Ver evolución →":"Ikusi bilakaera →"}</div>
        </div>
      ))}

      {/* Individual evolution when selected */}
      {selected && STUDENT_HISTORY[selected] && (
        <div style={{marginTop:14,padding:16,background:"#f8f8fa",borderRadius:12,border:"1px solid #eee",animation:"up .25s ease"}}>
          <div style={{fontWeight:800,fontSize:14,marginBottom:12,color:"#1a1a2e"}}>
            📈 {isEs?"Evolución de":"Bilakaera:"} {selected}
          </div>
          {dimKeys.map((k,i)=>{
            const vals=STUDENT_HISTORY[selected].map(w=>w[k]);
            const last=vals[vals.length-1];
            const first=vals[0];
            const trend=last-first;
            const c=last<2.5?"#DC2626":last<3.5?"#D97706":"#059669";
            return(
              <div key={k} style={{marginBottom:10}}>
                <div style={{display:"flex",justifyContent:"space-between",marginBottom:4}}>
                  <span style={{fontSize:11,fontWeight:600,color:"#555"}}>{dimLabels[i]}</span>
                  <span style={{fontSize:11,fontWeight:700,color:c}}>{last.toFixed(1)} {trend<-0.5?"↓":trend>0.5?"↑":"→"}</span>
                </div>
                <div style={{display:"flex",gap:3,alignItems:"flex-end",height:28}}>
                  {vals.map((v,wi)=>(
                    <div key={wi} style={{flex:1,display:"flex",flexDirection:"column",alignItems:"center",gap:2}}>
                      <div style={{width:"100%",borderRadius:"3px 3px 0 0",
                        height:`${(v/5)*24}px`,background:wi===vals.length-1?dimColors[i]:dimColors[i]+"66",
                        transition:"height .5s ease"}}/>
                      <span style={{fontSize:8,color:"#aaa"}}>S{wi+1}</span>
                    </div>
                  ))}
                </div>
              </div>
            );
          })}
          <div style={{marginTop:10,padding:"9px 11px",borderRadius:9,
            background:riskBg[riskLevel(STUDENT_HISTORY[selected])],
            border:`1px solid ${riskColor[riskLevel(STUDENT_HISTORY[selected])]}33`,
            fontSize:11,color:riskColor[riskLevel(STUDENT_HISTORY[selected])],fontWeight:600}}>
            {riskLevel(STUDENT_HISTORY[selected])==="high"
              ?(isEs?"⚠️ Tendencia preocupante. Se recomienda contacto individual con el alumno/a.":"⚠️ Joera kezkagarria. Ikaslearekin hartu harremanetan banaka.")
              :(isEs?"ℹ️ Seguimiento recomendado en próximas semanas.":"ℹ️ Hurrengo asteetan jarraipena gomendatzen da.")}
          </div>
        </div>
      )}
    </div>

    {/* Full class comparative */}
    <div className="card">
      <div className="ey">{isEs?"COMPARATIVA GRUPAL · TODOS LOS ALUMNOS":"TALDEKO KONPARAKETA · IKASLE GUZTIAK"}</div>
      <div className="ch" style={{fontSize:17,marginBottom:4}}>{isEs?"Búsqueda individual":"Banakako bilaketa"}</div>

      {/* Search */}
      <div style={{position:"relative",marginBottom:12}}>
        <span style={{position:"absolute",left:10,top:"50%",transform:"translateY(-50%)",fontSize:13,color:"#aaa"}}>🔍</span>
        <input type="text" value={search} onChange={e=>setSearch(e.target.value)}
          placeholder={isEs?"Buscar alumno/a...":"Ikaslea bilatu..."}
          style={{width:"100%",padding:"9px 10px 9px 32px",border:"1.5px solid #eee",borderRadius:9,
            fontSize:13,fontFamily:"'Plus Jakarta Sans',sans-serif",outline:"none",color:"#1a1a2e",background:"#fafafa"}}
          onFocus={e=>e.target.style.borderColor="#FF6B35"}
          onBlur={e=>e.target.style.borderColor="#eee"}
        />
      </div>

      {/* Student list */}
      <div style={{display:"flex",flexDirection:"column",gap:5,maxHeight:300,overflowY:"auto"}}>
        {filtered.map(s=>(
          <div key={s.name}>
            <div style={{display:"flex",alignItems:"center",gap:9,padding:"9px 12px",borderRadius:9,
              border:`1.5px solid ${selected===s.name?"#FF6B35":"#eee"}`,
              background:selected===s.name?"#FFF0EB":"white",cursor:"pointer",transition:"all .18s"}}
              onClick={()=>setSelected(selected===s.name?null:s.name)}>
              <div style={{width:28,height:28,borderRadius:"50%",
                background:riskColor[s.risk]+"22",color:riskColor[s.risk],
                display:"flex",alignItems:"center",justifyContent:"center",fontWeight:800,fontSize:12,flexShrink:0}}>
                {s.name.charAt(0)}
              </div>
              <div style={{flex:1,fontSize:12,fontWeight:500,color:"#1a1a2e"}}>{s.name}</div>
              <div style={{display:"flex",alignItems:"center",gap:6}}>
                <span style={{fontSize:11,fontWeight:700,color:riskColor[s.risk]}}>{s.lastScore}</span>
                <div style={{width:8,height:8,borderRadius:"50%",background:riskColor[s.risk]}}/>
              </div>
            </div>
            {/* Inline evolution for selected */}
            {selected===s.name && s.history && (
              <div style={{padding:"12px 14px",background:"#f8f8fa",borderRadius:"0 0 9px 9px",
                border:"1.5px solid #FF6B35",borderTop:"none",marginTop:-2}}>
                {dimKeys.map((k,i)=>{
                  const vals=s.history.map(w=>w[k]);
                  const last=vals[vals.length-1];
                  const c=last<2.5?"#DC2626":last<3.5?"#D97706":"#059669";
                  return(
                    <div key={k} style={{display:"flex",alignItems:"center",gap:7,marginBottom:6}}>
                      <span style={{fontSize:10,width:72,flexShrink:0,color:"#666"}}>{dimLabels[i]}</span>
                      <div style={{flex:1,height:4,background:"#eee",borderRadius:4,overflow:"hidden"}}>
                        <div style={{width:`${(last/5)*100}%`,height:"100%",background:c,borderRadius:4}}/>
                      </div>
                      <span style={{fontSize:10,fontWeight:700,color:c,width:24,textAlign:"right"}}>{last.toFixed(1)}</span>
                    </div>
                  );
                })}
                {!s.history&&<div style={{fontSize:11,color:"#aaa",textAlign:"center"}}>{isEs?"Sin historial disponible aún":"Historikorik oraindik ez"}</div>}
              </div>
            )}
          </div>
        ))}
      </div>

      <div style={{marginTop:12,padding:"9px 12px",borderRadius:9,background:"#f8f8fa",border:"1px solid #eee",
        display:"flex",gap:8,alignItems:"center",fontSize:11,color:"#888"}}>
        <span>🔒</span>
        {isEs?"Datos individuales visibles solo para tutor/a, orientación y dirección.":"Banakako datuak tutoreari, orientazioari eta zuzendaritzari bakarrik ikusgai."}
      </div>
    </div>
  </div>);
}

function MultiG({l,onSel}){
  const isEs=l!=="eu";
  const [tab,setTab]=useState("grupos");
  const [sel,ss]=useState(null);
  const avg=s=>(Object.values(s).reduce((a,b)=>a+b,0)/Object.values(s).length).toFixed(1);
  const col=v=>v<2.5?"#DC2626":v<3.5?"#D97706":"#059669";

  const tabBar=(
    <div style={{display:"flex",gap:4,background:"#f5f5f5",padding:"4px",borderRadius:9,marginBottom:14}}>
      <button className={`atab ${tab==="grupos"?"on":""}`} onClick={()=>setTab("grupos")}>{isEs?"Grupos":"Taldeak"}</button>
      <button className={`atab ${tab==="individual"?"on":""}`} onClick={()=>setTab("individual")}>{isEs?"👤 Individual":"👤 Banakako"}</button>
    </div>
  );

  if(tab==="individual") return(<div>{tabBar}<IndividualPanel l={l}/></div>);

  return(<div>
    {tabBar}
    <div className="card">
      <div className="ey">{isEs?"Gestión de múltiples grupos":"Talde anitzeko kudeaketa"}</div>
      <div className="ch" style={{fontSize:17,marginBottom:5}}>{isEs?"Tus grupos":"Zure taldeak"}</div>
      <div className="cb" style={{marginBottom:12,fontSize:11}}>{isEs?"Selecciona un grupo para ver su diagnóstico detallado.":"Hautatu talde bat diagnostiko zehatza ikusteko."}</div>
      {GRUPOS.map(g=>{const a=parseFloat(avg(g.scores));return(<div key={g.id} className={`grw ${sel===g.id?"on":""}`} onClick={()=>ss(g.id)}>
        <div className="gn">{g.name}</div>
        <div className="gnn">{g.n} {isEs?"alumn.":"ikasle"}</div>
        <div className="gsc" style={{color:col(a)}}>{a}/5</div>
        <div style={{fontSize:14,marginLeft:3}}>{a<2.5?"🔴":a<3.5?"🟡":"🟢"}</div>
      </div>);})}
      {sel&&(<div style={{marginTop:14,padding:14,background:"#f8f8fa",borderRadius:11,border:"1px solid #eee"}}>
        <div style={{fontWeight:700,fontSize:13,marginBottom:9}}>{GRUPOS.find(g=>g.id===sel)?.name}</div>
        <DimBars scores={GRUPOS.find(g=>g.id===sel)?.scores||{}} l={l}/>
        <button className="btn bp bs" style={{marginTop:9}} onClick={()=>onSel(GRUPOS.find(g=>g.id===sel))}>{l==="eu"?"Diagnostiko osoa →":"Ver diagnóstico completo →"}</button>
      </div>)}
    </div>
    <div className="card">
      <div className="ey">{l==="eu"?"Esportazioa · Orientazioa / Zuzendaritza":"Exportación · Orientación / Dirección"}</div>
      <div className="ch" style={{fontSize:17,marginBottom:5}}>{l==="eu"?"Txostenak eta datuak":"Informes y datos"}</div>
      <div className="cb" style={{marginBottom:12,fontSize:11}}>{l==="eu"?"Datu guztiak anonimoak dira. Orientazioak eta zuzendaritzak ikus ditzakete.":"Todos los datos son anónimos. Acceso para orientación y dirección."}</div>
      {[
        {le:l==="eu"?"Gelako diagnostikoa · 2º Bach A":"Diagnóstico de aula · 2º Bach A",me:l==="eu"?"14. astea · 26 ikasle":"Semana 14 · 26 alumnos/as", real:true},
        {le:l==="eu"?"Taldeen arteko konparaketa":"Comparativa entre grupos",me:l==="eu"?"4 talde · 2025ko martxoa":"4 grupos · Marzo 2025", real:false},
        {le:l==="eu"?"Bilakaeraren historikoa · 2º Bach A":"Histórico evolución · 2º Bach A",me:l==="eu"?"14 aste · 6 dimentsio":"14 semanas · 6 dimensiones", real:false},
        {le:l==="eu"?"Esku-hartzeen txostena":"Informe de intervenciones",me:l==="eu"?"5 jarduera · eragina neurtuta":"5 actividades · impacto medido", real:false},
      ].map((r,i)=><div key={i} className="exr">
        <div><div className="exl">{r.le}</div><div className="exm">{r.me}</div></div>
        {r.real
          ? <button
              className="bg"
              style={{background:"#FFF0EB",color:"#FF6B35",border:"1px solid #ffd4c0",fontWeight:700}}
              onClick={()=>window.open("https://drive.google.com/file/d/1s7COR2LxPv6l020h298AGEdJHy53Ul2N/view?usp=sharing","_blank","noopener")}
            >⬇ PDF</button>
          : <button className="bg" style={{opacity:.4,cursor:"default"}} title={l==="eu"?"Laster":"Próximamente"}>⬇ PDF</button>
        }
      </div>)}
    </div>
  </div>);
}

function ProfeV({l}){
  const [st,sst]=useState("mg");
  const [sa,ssa]=useState(null);
  const [ra,sra]=useState(false);
  const [gr,sgr]=useState(null);

  if(st==="mg")return <MultiG l={l} onSel={g=>{sgr(g);sst(0);}}/>;

  if(st===0)return(<div>
    <StepsBar cur={0} l={l}/>
    <div className="card">
      <div className="ey">Dashboard · {gr?.name} · {l==="eu"?"14. astea":"Semana 14"}</div>
      <div className="ch">{l==="eu"?"Gelako egoera":"Estado del aula"}</div>
      <div className="cb" style={{marginBottom:10,fontSize:11}}>{gr?.n} {l==="eu"?"erantzun jasota":"respuestas recibidas"}</div>
      <DimBars scores={gr?.scores||SB} l={l}/>
      <AIBubble l={l}/>
      <div className="alrt"><span>⚠️</span><div><strong>2 {l==="eu"?"ohartarazpen":"alertas"}:</strong> {l==="eu"?"Kidetasuna (2,4) eta Harremanak (2,3) atalasearen azpian.":"Pertenencia (2.4) y Relaciones (2.3) bajo el umbral recomendado."}</div></div>
      <div className="acts">
        <button className="bg" onClick={()=>sst("mg")}>← {l==="eu"?"Taldeak":"Grupos"}</button>
        <button className="btn bp bs" onClick={()=>sst(1)}>{l==="eu"?"Hobetze-eremuak →":"Ver áreas de mejora →"}</button>
      </div>
    </div>
  </div>);

  if(st===1){
    const areas=[
      {di:4,sc:2.3,te:"Tensión interpersonal. El 34% reporta conflicto sin resolver.",tu:"Tentsio interpertsonala. %34ak konpondu gabeko gatazka.",c:"#DC2626",lv:"Alta"},
      {di:2,sc:2.4,te:"Baja percepción de pertenencia. Tendencia negativa 4 semanas.",tu:"Kidetasun hautemate txikia. Joera negatiboa 4 astetan.",c:"#DC2626",lv:"Alta"},
      {di:3,sc:2.8,te:"Nivel moderado-bajo. Puede relacionarse con la carga académica.",tu:"Maila moderatu-baxua. Lan akademikoarekin lotuta egon daiteke.",c:"#D97706",lv:"Media"},
      {di:0,sc:2.9,te:"Motivación bajo la media. Conectada con estrés elevado.",tu:"Motibazioa batez azpian. Estres altuarekin lotuta.",c:"#D97706",lv:"Media"},
      {di:5,sc:3.9,te:"Estrés elevado. Coincide con periodo de exámenes.",tu:"Estres altua. Azterketa garaiarekin bat dator.",c:"#D97706",lv:"Atenc."},
      {di:1,sc:3.6,te:"Bienestar estable. No requiere intervención inmediata.",tu:"Ongizate egonkorra. Ez du berehalako esku-hartzerik behar.",c:"#059669",lv:"OK"},
    ];
    const dl=l==="eu"?T.eu.dims.items:T.es.dims.items;
    return(<div>
      <StepsBar cur={1} l={l}/>
      <div className="card">
        <div className="ey">{l==="eu"?"Hobetze-eremuak":"Áreas de mejora"}</div>
        <div className="ch" style={{fontSize:17,marginBottom:5}}>{l==="eu"?"Gelak zer behar du?":"¿Qué necesita el aula?"}</div>
        <div className="cb" style={{marginBottom:12,fontSize:11}}>{l==="eu"?"Gaurko eta azken asteen diagnostikoan oinarrituta.":"Diagnóstico basado en respuestas de hoy y evolución reciente."}</div>
        {areas.map((a,i)=>{const d=dl[a.di];return(<div key={i} className="sem" style={{background:a.c+"0d",borderColor:a.c+"33",color:"#1a1a2e"}}>
          <div className="sd" style={{background:a.c}}/>
          <div style={{flex:1}}>
            <div style={{display:"flex",justifyContent:"space-between",marginBottom:2}}>
              <strong style={{fontSize:12}}>{d?.e} {d?.label}</strong>
              <span style={{fontSize:9,fontWeight:700,color:a.c,background:a.c+"1a",padding:"1px 6px",borderRadius:999}}>{a.lv} · {a.sc}/5</span>
            </div>
            <div style={{fontSize:11,color:"#666"}}>{l==="eu"?a.tu:a.te}</div>
          </div>
        </div>);})}
        <div className="acts">
          <button className="bg" onClick={()=>sst(0)}>← {l==="eu"?"Atzera":"Volver"}</button>
          <button className="btn bp bs" onClick={()=>sst(2)}>{l==="eu"?"Esku-hartzeak →":"Ver intervenciones →"}</button>
        </div>
      </div>
    </div>);
  }

  if(st===2)return(<div>
    <StepsBar cur={2} l={l}/>
    <div className="card">
      <div className="ey">{l==="eu"?"Gomendatutako jarduerak":"Intervenciones recomendadas"}</div>
      <div className="ch" style={{fontSize:17,marginBottom:5}}>{l==="eu"?"Aukeratu jarduera bat":"Elige una actividad"}</div>
      <div className="cb" style={{marginBottom:12,fontSize:11}}>{l==="eu"?"Prestaketa gehigarririk gabe aplikatzeko prest.":"Listas para aplicar en clase sin preparación extra."}</div>
      {ACTS.map(a=><div key={a.id} className={`acard ${sa===a.id?"on":""}`} onClick={()=>ssa(a.id)}>
        <div className="aico">{a.icon}</div>
        <div style={{flex:1}}>
          <div className="at">{l==="eu"?a.tu:a.te}</div>
          <div className="am">{l==="eu"?a.tyu:a.tye} · {a.dur}</div>
          <div style={{fontSize:11,color:"#666",marginTop:3,lineHeight:1.4}}>{l==="eu"?a.du:a.de}</div>
        </div>
      </div>)}
      <div className="acts">
        <button className="bg" onClick={()=>sst(1)}>← {l==="eu"?"Atzera":"Volver"}</button>
        <button className="btn bp bs" disabled={!sa} style={{opacity:sa?1:0.4}} onClick={()=>sst(3)}>{l==="eu"?"Jarduera abian jarri →":"Lanzar actividad →"}</button>
      </div>
    </div>
  </div>);

  if(st===3){const ac=ACTS.find(a=>a.id===sa);return(<div>
    <StepsBar cur={3} l={l}/>
    <div className="card">
      {!ra?(<>
        <div className="ey">{l==="eu"?"Hautatutako jarduera":"Actividad seleccionada"}</div>
        <div className="ch" style={{fontSize:16,marginBottom:3}}>{ac?.icon} {l==="eu"?ac?.tu:ac?.te}</div>
        <div className="cb" style={{marginBottom:14,fontSize:11}}>{l==="eu"?ac?.du:ac?.de}</div>
        <div style={{background:"#f8f8fa",borderRadius:11,padding:"13px 14px",marginBottom:12}}>
          <div style={{fontSize:9,fontWeight:700,letterSpacing:"1px",textTransform:"uppercase",color:"#FF6B35",marginBottom:7}}>{l==="eu"?"Irakasleak eman beharreko argibideak":"Instrucciones para el docente"}</div>
          <div style={{fontSize:11,color:"#666",lineHeight:1.65}}>
            {l==="eu"?<>1. Esan ikasleei Klaizen beren gailuan ireki dezatela.<br/>2. Hautatu "Ikasle/ak" goiko menuan.<br/>3. Check-in egin eta <strong>{ac?.tu}</strong> jarduerara sartuko dira.<br/>4. Utzi {ac?.dur} banaka edo bikoteka osatzeko.<br/>5. 5 minutuko hausnarketa kolektiboa gidatu.</>
            :<>1. Indica al alumnado que abran Klaizen en su dispositivo.<br/>2. Seleccionen "Alumno/a" en el menú superior.<br/>3. Hagan el check-in y accederán a la actividad <strong>{ac?.te}</strong>.<br/>4. Deja {ac?.dur} para completarla.<br/>5. Guía una reflexión colectiva de 5 minutos.</>}
          </div>
        </div>
        <div className="acts">
          <button className="bg" onClick={()=>sst(2)}>← {l==="eu"?"Atzera":"Volver"}</button>
          <button className="bg" onClick={()=>sra(true)}>{l==="eu"?"Aurrebista →":"Previsualizar →"}</button>
          <button className="btn bp bs" onClick={()=>sst(4)}>{l==="eu"?"Eginda gisa markatu ✓":"Marcar como realizada ✓"}</button>
        </div>
      </>):(<>
        <div className="ey">{l==="eu"?"Aurrebista · Ikasleen ikuspegia":"Previsualización · Vista alumno/a"}</div>
        <div className="ch" style={{fontSize:15,marginBottom:3}}>{ac?.icon} {l==="eu"?ac?.tu:ac?.te}</div>
        <hr className="dv"/>
        <ActRunner act={ac} l={l} done={()=>sra(false)}/>
        <button className="bg" style={{marginTop:10}} onClick={()=>sra(false)}>← {l==="eu"?"Aurrebista utzi":"Salir de previsualización"}</button>
      </>)}
    </div>
  </div>);}

  if(st===4){const ac=ACTS.find(a=>a.id===sa);return(<div>
    <StepsBar cur={4} l={l}/>
    <div className="card">
      <div className="ey">{l==="eu"?"Eraginaren ebaluazioa":"Evaluación de impacto"}</div>
      <div className="ch" style={{fontSize:17,marginBottom:5}}>{l==="eu"?"Esku-hartzeak funtzionatu al du?":"¿Funcionó la intervención?"}</div>
      <div className="cb" style={{fontSize:11,marginBottom:12}}>{l==="eu"?"Jarduera:":"Actividad:"} <strong>{l==="eu"?ac?.tu:ac?.te}</strong></div>
      <div className="cm">
        <div className="cb2" style={{background:"#fef2f2",borderColor:"#fecaca"}}><div className="cl">{l==="eu"?"Aurretik":"Antes"}</div><div className="cn" style={{color:"#DC2626"}}>2.4</div><div style={{fontSize:10,color:"#aaa",marginTop:2}}>{l==="eu"?"Kidetasuna":"Pertenencia"}</div></div>
        <div className="cb2" style={{background:"#f0fdf4",borderColor:"#bbf7d0"}}><div className="cl">{l==="eu"?"Ostean":"Después"}</div><div className="cn" style={{color:"#059669"}}>3.5</div><div style={{fontSize:10,color:"#059669",marginTop:2}}>+1.1 ↑</div></div>
      </div>
      <DimBars scores={SA} l={l}/>
      <div className="sem" style={{background:"#f0fdf4",borderColor:"#bbf7d0",color:"#1a1a2e",marginTop:4}}>
        <div className="sd" style={{background:"#059669"}}/>
        <div style={{fontSize:11}}><strong>{l==="eu"?"Hobekuntza nabarmena.":"Mejora significativa."}</strong> {l==="eu"?"Kidetasuna +1,1. Harremanak +1,1. Autokonfiantza +0,5.":"Pertenencia +1.1. Relaciones +1.1. Autoconfianza +0.5."}</div>
      </div>
      <div className="alrt"><span>📋</span><div style={{fontSize:11}}>{l==="eu"?"Gomendioa: 2 asteren buruan talde-kohesiorako jarduera errepikatu. Orientazioak txostena eska dezake.":"Recomendación: repetir actividad de cohesión en 2 semanas. Orientación puede solicitar el informe."}</div></div>
      <div className="acts">
        <button className="bg" onClick={()=>sst(3)}>← {l==="eu"?"Atzera":"Volver"}</button>
        <button className="btn bp bs" onClick={()=>{sst("mg");ssa(null);sra(false);}}>{l==="eu"?"Ziklo berria ↺":"Nuevo ciclo ↺"}</button>
      </div>
    </div>
  </div>);}
}

// ── Platform accordion data ───────────────────────────────────────────────────
const MOCKUPS_ES = [
  {
    id:"checkin", icon:"📋", title:"Check-in del alumnado",
    desc:"El alumnado completa 12 preguntas en menos de 3 minutos desde móvil o tablet. Las respuestas son completamente anónimas y cubren 6 dimensiones de bienestar.",
    preview: (
      <div style={{background:"#f8f8fa",borderRadius:14,padding:"16px",border:"1px solid #eee"}}>
        <div style={{display:"flex",alignItems:"center",gap:8,marginBottom:12}}>
          <div style={{width:8,height:8,borderRadius:"50%",background:"#FF6B35"}}/>
          <span style={{fontSize:11,fontWeight:700,color:"#FF6B35",letterSpacing:"1px",textTransform:"uppercase"}}>Pregunta 3 de 12 · Pertenencia</span>
        </div>
        <div style={{fontSize:15,fontWeight:700,marginBottom:14,lineHeight:1.35}}>¿Sientes que encajas bien en este grupo?</div>
        <div style={{display:"grid",gridTemplateColumns:"repeat(5,1fr)",gap:6}}>
          {[["😔","Muy bajo"],["😐","Bajo"],["🙂","Regular"],["😊","Bien"],["🤩","Genial"]].map(([e,l],i)=>(
            <div key={i} style={{display:"flex",flexDirection:"column",alignItems:"center",gap:4,padding:"10px 4px",borderRadius:10,border:`1.5px solid ${i===3?"#FF6B35":"#eee"}`,background:i===3?"#FFF0EB":"#fff",fontSize:20}}>
              {e}<span style={{fontSize:9,color:i===3?"#FF6B35":"#aaa",fontWeight:500}}>{l}</span>
            </div>
          ))}
        </div>
        <div style={{marginTop:12,height:3,background:"#f0f0f0",borderRadius:3,overflow:"hidden"}}>
          <div style={{width:"25%",height:"100%",background:"#FF6B35",borderRadius:3}}/>
        </div>
      </div>
    )
  },
  {
    id:"dashboard", icon:"📊", title:"Dashboard del docente",
    desc:"Vista instantánea del estado del aula con las 6 dimensiones medidas, evolución semanal, alertas suaves y recomendación generada por IA. Sin tecnicismos.",
    preview: (
      <div style={{background:"#f8f8fa",borderRadius:14,padding:"16px",border:"1px solid #eee"}}>
        <div style={{fontSize:11,fontWeight:700,color:"#aaa",letterSpacing:"1px",textTransform:"uppercase",marginBottom:10}}>2º BACH A · SEMANA 14</div>
        {[["🔥","Motivación",2.9,"#D97706"],["💙","Bienestar",3.6,"#059669"],["🤝","Pertenencia",2.4,"#DC2626"],["⭐","Autoconfianza",2.8,"#D97706"],["💬","Relaciones",2.3,"#DC2626"],["🌀","Estrés",3.9,"#D97706"]].map(([e,lb,v,c],i)=>(
          <div key={i} style={{display:"flex",alignItems:"center",gap:8,marginBottom:7}}>
            <span style={{fontSize:13,width:18}}>{e}</span>
            <span style={{fontSize:11,width:90,color:"#555",fontWeight:500}}>{lb}</span>
            <div style={{flex:1,height:5,background:"#eee",borderRadius:5,overflow:"hidden"}}>
              <div style={{width:`${(v/5)*100}%`,height:"100%",background:c,borderRadius:5}}/>
            </div>
            <span style={{fontSize:11,fontWeight:700,color:c,width:24,textAlign:"right"}}>{v}</span>
          </div>
        ))}
        <div style={{marginTop:10,padding:"8px 12px",borderRadius:9,background:"#FFFBEB",border:"1px solid #fde68a",fontSize:11,color:"#92400e"}}>
          ⚠️ Pertenencia y Relaciones por debajo del umbral recomendado
        </div>
      </div>
    )
  },
  {
    id:"ia", icon:"✨", title:"Recomendación por IA",
    desc:"Klaizen analiza el diagnóstico y genera una recomendación contextualizada: qué trabajar, por qué, y qué actividad propone. En segundos, sin que el docente tenga que interpretar datos.",
    preview: (
      <div style={{background:"linear-gradient(135deg,#fff8f5,#f0f4ff)",borderRadius:14,padding:"16px",border:"1.5px solid #e8e0ff"}}>
        <div style={{display:"flex",alignItems:"center",gap:6,fontSize:11,fontWeight:700,color:"#7c3aed",letterSpacing:"1px",textTransform:"uppercase",marginBottom:10}}>
          <span>✨</span> Recomendación IA
        </div>
        <div style={{fontSize:13,color:"#444",lineHeight:1.6}}>
          Detecto caída sostenida en <strong>pertenencia</strong> (-0.6 en 4 semanas) y <strong>relaciones</strong> bajas (2.3/5). Recomiendo priorizar cohesión grupal esta semana.
        </div>
        <div style={{marginTop:12,display:"flex",alignItems:"center",gap:10,padding:"10px 12px",borderRadius:10,background:"white",border:"1px solid #eee"}}>
          <span style={{fontSize:20}}>🌡️</span>
          <div>
            <div style={{fontSize:13,fontWeight:700}}>Termómetro del grupo</div>
            <div style={{fontSize:11,color:"#aaa"}}>15 min · Cohesión · Lista para aplicar</div>
          </div>
        </div>
      </div>
    )
  },
  {
    id:"actividad", icon:"⚡", title:"Actividades interactivas",
    desc:"El alumnado completa las actividades directamente en la app: Ikigai adaptado, Termómetro del grupo, Carta a mi yo futuro, Mis 3 motores. Sin preparación extra para el docente.",
    preview: (
      <div style={{background:"#f8f8fa",borderRadius:14,padding:"16px",border:"1px solid #eee"}}>
        <div style={{fontSize:11,fontWeight:700,color:"#aaa",letterSpacing:"1px",textTransform:"uppercase",marginBottom:10}}>Actividades disponibles</div>
        {[["🌀","Ikigai del aula","25 min","Autoconocimiento"],["🌡️","Termómetro del grupo","15 min","Cohesión"],["✉️","Carta a mi yo futuro","20 min","Motivación"],["⚡","Mis 3 motores","10 min","Motivación"]].map(([ic,tt,dur,tp],i)=>(
          <div key={i} style={{display:"flex",alignItems:"center",gap:10,padding:"9px 10px",borderRadius:9,border:"1px solid #eee",background:"white",marginBottom:6}}>
            <span style={{fontSize:18}}>{ic}</span>
            <div style={{flex:1}}>
              <div style={{fontSize:12,fontWeight:700}}>{tt}</div>
              <div style={{fontSize:10,color:"#aaa"}}>{tp} · {dur}</div>
            </div>
            <div style={{width:8,height:8,borderRadius:"50%",background:"#22c55e"}}/>
          </div>
        ))}
      </div>
    )
  },
  {
    id:"impacto", icon:"📈", title:"Medición de impacto",
    desc:"Tras cada intervención, Klaizen vuelve a medir y compara el antes y el después. El docente ve en segundos si la actividad ha tenido efecto y qué recomienda hacer a continuación.",
    preview: (
      <div style={{background:"#f8f8fa",borderRadius:14,padding:"16px",border:"1px solid #eee"}}>
        <div style={{fontSize:11,fontWeight:700,color:"#aaa",letterSpacing:"1px",textTransform:"uppercase",marginBottom:12}}>Pertenencia · Antes vs. Después</div>
        <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:10,marginBottom:12}}>
          <div style={{padding:"14px",borderRadius:12,background:"#fef2f2",border:"1px solid #fecaca",textAlign:"center"}}>
            <div style={{fontSize:10,fontWeight:700,color:"#aaa",marginBottom:4,textTransform:"uppercase"}}>Antes</div>
            <div style={{fontSize:36,fontWeight:800,color:"#DC2626"}}>2.4</div>
          </div>
          <div style={{padding:"14px",borderRadius:12,background:"#f0fdf4",border:"1px solid #bbf7d0",textAlign:"center"}}>
            <div style={{fontSize:10,fontWeight:700,color:"#aaa",marginBottom:4,textTransform:"uppercase"}}>Después</div>
            <div style={{fontSize:36,fontWeight:800,color:"#059669"}}>3.5</div>
            <div style={{fontSize:11,color:"#059669",fontWeight:700}}>+1.1 ↑</div>
          </div>
        </div>
        <div style={{padding:"9px 12px",borderRadius:9,background:"#f0fdf4",border:"1px solid #bbf7d0",fontSize:11,color:"#166534"}}>
          ✅ Mejora significativa tras "Termómetro del grupo"
        </div>
      </div>
    )
  },
];

const MOCKUPS_EU = [
  {id:"checkin",icon:"📋",title:"Ikasleen check-in-a",desc:"Ikasleak 12 galdera osatzen ditu 3 minutu baino gutxiagotan mugikorrean edo tabletan. Erantzunak guztiz anonimoak dira eta ongizatearen 6 dimentsio estaltzen dituzte."},
  {id:"dashboard",icon:"📊",title:"Irakaslearen dashboard-a",desc:"Gelaren egoeraren berehala ikuspegia, 6 dimentsio neurtuta, aste-bilakaera, ohartarazpen leunak eta AAk sortutako gomendioa. Termino teknikorik gabe."},
  {id:"ia",icon:"✨",title:"AAren gomendioa",desc:"Klaizenk diagnostikoa aztertu eta testuinguruko gomendioa sortzen du: zer landu, zergatik, eta zer jarduera proposatzen duen. Segundotan, irakasleak datuak interpretatu gabe."},
  {id:"actividad",icon:"⚡",title:"Jarduera interaktiboak",desc:"Ikasleak jarduerak zuzenean appean osatzen dituzte: Ikigai egokitua, Taldeko termometroa, Gutuna nire etorkizuneko niari, Nire 3 motorrak. Irakasleari prestaketa gehigarririk gabe."},
  {id:"impacto",icon:"📈",title:"Eraginaren neurketa",desc:"Esku-hartze bakoitzaren ostean, Klaizenk berriro neurtzen du eta aurretik/ostean konparatzen du. Irakasleak segundotan ikusten du jarduerak eragina izan duen eta zer gomendatzen den."},
];

const FAQ_ES = [
  {q:"¿Los datos de los alumnos son anónimos?", a:"Sí, siempre. El profesorado solo accede a resultados agregados del grupo. Nunca se muestran datos individuales ni se vinculan respuestas a un alumno/a concreto."},
  {q:"¿Es un diagnóstico psicológico?", a:"No. Klaizen es una herramienta educativa, no clínica. No diagnostica trastornos ni sustituye al orientador/a o al psicólogo/a. Usa lenguaje educativo, no clínico."},
  {q:"¿Cuánto tiempo necesita el alumnado?", a:"El check-in dura entre 2 y 3 minutos. Las actividades interactivas entre 10 y 25 minutos. Todo está diseñado para caber en una sesión de tutoría."},
  {q:"¿Qué dispositivos necesitan?", a:"Cualquier dispositivo con navegador: móvil, tablet o ordenador. No requiere instalación de ninguna app."},
  {q:"¿Quién puede ver los informes?", a:"Tutores/as ven el estado de su grupo. Orientación y dirección acceden a informes anónimos comparativos entre grupos. Nadie puede ver respuestas individuales."},
  {q:"¿Cumple con el RGPD?", a:"Sí. Todos los datos se almacenan en servidores europeos, sin publicidad, sin perfilado de menores y cumpliendo la normativa vigente de protección de datos."},
  {q:"¿En qué idiomas está disponible?", a:"Interfaz completa en castellano y euskera. Todas las preguntas, actividades y comunicaciones están disponibles en ambos idiomas."},
  {q:"¿Cuánto cuesta?", a:"Kontakta con nosotros a través del formulario de demo para conocer los planes disponibles para tu centro. Ofrecemos un periodo de prueba gratuito."},
];

const FAQ_EU = [
  {q:"Ikasleen datuak anonimoak al dira?", a:"Bai, beti. Irakasleek taldeko emaitza agregatuak bakarrik ikusten dituzte. Ez dira inoiz banakako datuak erakusten, ezta erantzunak ikasle zehatz batekin lotu ere."},
  {q:"Diagnostiko psikologikoa al da?", a:"Ez. Klaizen hezkuntza-tresna bat da, ez klinikoa. Ez ditu nahasmenduak diagnostikatzen, ezta orientatzailea edo psikologo/a ordezkatzen ere. Hezkuntza-hizkuntza erabiltzen du, ez klinikoa."},
  {q:"Zenbat denbora behar du ikasleak?", a:"Check-in-ak 2-3 minutu irauten du. Jarduera interaktiboek 10-25 minutu artean. Dena tutoretza saio batean sartzeko diseinatuta dago."},
  {q:"Zein gailu behar dituzte?", a:"Nabigatzailea duen edozein gailu: mugikorra, tableta edo ordenagailua. Ez du aplikaziorik instalatu behar."},
  {q:"Nork ikus ditzake txostenak?", a:"Tutore/ek beren taldearen egoera ikusten dute. Orientazioak eta zuzendaritzak taldeen arteko txosten anonimoak ikus ditzakete. Inork ezin ditu banakako erantzunak ikusi."},
  {q:"EBEOrekin betetzen al du?", a:"Bai. Datu guztiak Europako zerbitzarietan gordetzen dira, publizitaterik gabe, adingabeen profilerik gabe eta indarreko datu-babeserako araudia betez."},
  {q:"Zein hizkuntzatan dago eskuragarri?", a:"Interfaze osoa gaztelaniaz eta euskaraz. Galdera, jarduera eta komunikazio guztiak bi hizkuntzatan daude eskuragarri."},
  {q:"Zenbat balio du?", a:"Jarri zurekin harremanetan demo-formularioaren bidez zure ikastetxerako plan eskuragarriak ezagutzeko. Doako proba-aldi bat eskaintzen dugu."},
];

function PlatformSection({l, sectionRef}){
  const [openMockup, setOpenMockup] = useState(null);
  const [openFaq, setOpenFaq] = useState(null);
  const isEs = l !== "eu";
  const mockups = isEs ? MOCKUPS_ES : MOCKUPS_ES.map((m,i)=>({...m,...MOCKUPS_EU[i]}));
  const faqs = isEs ? FAQ_ES : FAQ_EU;

  return(
    <div ref={sectionRef} id="klaizen-platform" style={{background:"#fff",borderTop:"1px solid #f0f0f0"}}>
      {/* MOCKUPS */}
      <div className="s" style={{paddingBottom:40}}>
        <div className="stag">{isEs?"LA PLATAFORMA":"PLATAFORMA"}</div>
        <h2 className="sh">{isEs?"Cada módulo, en detalle":"Modulu bakoitza, xehetasunez"}</h2>
        <p className="ssub">{isEs?"Haz clic en cada módulo para ver cómo se ve en la app.":"Egin klik modulu bakoitzean appean nola ikusten den ikusteko."}</p>
        <div style={{display:"flex",flexDirection:"column",gap:8}}>
          {mockups.map((m,i)=>(
            <div key={m.id} style={{border:"1.5px solid",borderColor:openMockup===m.id?"#FF6B35":"#f0f0f0",borderRadius:14,overflow:"hidden",transition:"border-color .2s"}}>
              {/* Header row */}
              <button onClick={()=>setOpenMockup(openMockup===m.id?null:m.id)} style={{
                width:"100%",display:"flex",alignItems:"center",gap:14,padding:"16px 20px",
                background:openMockup===m.id?"#FFF0EB":"white",border:"none",cursor:"pointer",textAlign:"left",transition:"background .2s",
              }}>
                <div style={{width:40,height:40,borderRadius:10,background:openMockup===m.id?"#FF6B35":"#f5f5f5",display:"flex",alignItems:"center",justifyContent:"center",fontSize:18,flexShrink:0,transition:"all .2s"}}>
                  {m.icon}
                </div>
                <div style={{flex:1}}>
                  <div style={{fontSize:15,fontWeight:700,color:"#1a1a2e",marginBottom:2}}>{m.title}</div>
                  <div style={{fontSize:12,color:"#888",lineHeight:1.4}}>{m.desc}</div>
                </div>
                <div style={{fontSize:18,color:openMockup===m.id?"#FF6B35":"#ccc",transition:"transform .2s",transform:openMockup===m.id?"rotate(180deg)":"none",flexShrink:0}}>⌄</div>
              </button>
              {/* Preview */}
              {openMockup===m.id&&(
                <div style={{padding:"0 20px 20px",animation:"up .25s ease"}}>
                  {m.preview || (
                    <div style={{background:"#f8f8fa",borderRadius:14,padding:"24px",border:"1px solid #eee",textAlign:"center",color:"#aaa",fontSize:13}}>
                      {isEs?"Mockup disponible próximamente":"Mockupa laster eskuragarri"}
                    </div>
                  )}
                </div>
              )}
            </div>
          ))}
        </div>
      </div>

      {/* FAQ */}
      <div style={{background:"#f8f8fa",padding:"60px 32px"}}>
        <div style={{maxWidth:700,margin:"0 auto"}}>
          <div className="stag">{isEs?"PREGUNTAS FRECUENTES":"OHIKO GALDERAK"}</div>
          <h2 className="sh">{isEs?"Todo lo que necesitas saber":"Jakin behar duzun guztia"}</h2>
          <div style={{display:"flex",flexDirection:"column",gap:6,marginTop:32}}>
            {faqs.map((f,i)=>(
              <div key={i} style={{background:"white",borderRadius:12,border:`1.5px solid ${openFaq===i?"#FF6B35":"#eee"}`,overflow:"hidden",transition:"border-color .2s"}}>
                <button onClick={()=>setOpenFaq(openFaq===i?null:i)} style={{
                  width:"100%",display:"flex",alignItems:"center",justifyContent:"space-between",gap:12,
                  padding:"16px 20px",background:"none",border:"none",cursor:"pointer",textAlign:"left",
                }}>
                  <span style={{fontSize:14,fontWeight:600,color:"#1a1a2e",lineHeight:1.4}}>{f.q}</span>
                  <span style={{fontSize:18,color:openFaq===i?"#FF6B35":"#ccc",flexShrink:0,transition:"transform .2s",transform:openFaq===i?"rotate(180deg)":"none"}}>⌄</span>
                </button>
                {openFaq===i&&(
                  <div style={{padding:"0 20px 16px",fontSize:13,color:"#555",lineHeight:1.65,animation:"up .2s ease"}}>
                    {f.a}
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

// ── Landing ───────────────────────────────────────────────────────────────────
function Landing({l,onApp,onTour,onDemo,onPlatform}){
  const t=l==="eu"?T.eu:T.es;
  const platformRef = useRef(null);
  function scrollToPlatform(){ platformRef.current?.scrollIntoView({behavior:"smooth"}); if(onPlatform) onPlatform(); }
  const bars=[{h:58,c:"#DC2626",lb:l==="eu"?"Kidetasuna":"Pertenencia"},{h:72,c:"#D97706",lb:l==="eu"?"Motibazioa":"Motivación"},{h:82,c:"#059669",lb:l==="eu"?"Ongizatea":"Bienestar"},{h:64,c:"#7C3AED",lb:l==="eu"?"Estresa":"Estrés"}];
  return(<>
    {/* HERO */}
    <section className="hero">
      <div>
        <div className="hero-tag">{t.hero.tag}</div>
        <h1 className="hero-h1">{t.hero.h1a}<br/><span>{t.hero.h1b}</span></h1>
        <p className="hero-sub">{t.hero.sub}</p>
        <div className="hero-btns">
          <button className="btn bp" onClick={onDemo}>{t.hero.cta1}</button>
          <button className="btn bo" onClick={onTour}>{t.hero.cta2}</button>
        </div>
      </div>
      <div className="hv">
        <div className="hcard">
          <div className="hcard-lbl">{l==="eu"?"GELAKO EGOERA · 2º BACH A":"ESTADO DEL AULA · 2º BACH A"}</div>
          <div className="mbars">{bars.map((b,i)=><div key={i} style={{flex:1,display:"flex",flexDirection:"column",alignItems:"center",height:"100%",justifyContent:"flex-end",gap:3}}>
            <div className="mbar" style={{height:`${b.h}%`,background:b.c,width:"100%"}}/>
            <div className="mbar-l">{b.lb}</div>
          </div>)}</div>
        </div>
        <div className="hcard" style={{display:"flex",justifyContent:"space-between",alignItems:"center"}}>
          <div>
            <div className="hcard-lbl">{l==="eu"?"ESKU-HARTZEA":"INTERVENCIÓN"}</div>
            <div style={{fontSize:14,fontWeight:700}}>🌡️ {l==="eu"?"Taldeko termometroa":"Termómetro del grupo"}</div>
            <div style={{fontSize:11,color:"#aaa"}}>15 min · {l==="eu"?"Kohesioa":"Cohesión"}</div>
          </div>
          <button className="btn bp bs" onClick={onTour}>{l==="eu"?"Ikusi":"Ver"}</button>
        </div>
        <div className="hcard" style={{background:"#f0fdf4",border:"1px solid #bbf7d0"}}>
          <span className="pdot"/><span style={{fontSize:12,fontWeight:700,color:"#166534"}}>{l==="eu"?"Kidetasuna +1,1 puntu esku-hartzearen ostean":"Pertenencia +1.1 puntos tras la intervención"}</span>
        </div>
      </div>
    </section>

    {/* ROLES */}
    <div className="sf">
      <div style={{maxWidth:1100,margin:"0 auto"}}>
        <div className="stag">{l==="eu"?"NORK ERABILTZEN DU":"PARA QUIÉN"}</div>
        <h2 className="sh">{t.roles.title}</h2>
        <div className="rg">{t.roles.items.map((r,i)=><div key={i} className="rc"><div className="ri">{r.icon}</div><div className="rn">{r.role}</div><div className="rd">{r.desc}</div></div>)}</div>
      </div>
    </div>

    {/* HOW */}
    <div className="s">
      <div className="stag">{l==="eu"?"NOLA FUNTZIONATZEN DU":"CÓMO FUNCIONA"}</div>
      <h2 className="sh">{t.how.title}</h2>
      <div className="stg">{t.how.steps.map((s,i)=><div key={i} className="stc"><div className="stn">{s.n}</div><div className="stt">{s.title}</div><div className="std">{s.desc}</div></div>)}</div>
    </div>

    {/* DIMS */}
    <div className="sf">
      <div style={{maxWidth:1100,margin:"0 auto"}}>
        <div className="stag">{l==="eu"?"ZER NEURTZEN DUGU":"QUÉ MEDIMOS"}</div>
        <h2 className="sh">{t.dims.title}</h2>
        <p className="ssub">{t.dims.sub}</p>
        <div className="dg">{t.dims.items.map((d,i)=><div key={i} className="dc" style={{background:DIMS_DATA[i].bg}}>
          <div className="de">{d.e}</div><div><div className="dl">{d.label}</div><div className="dd">{d.desc}</div></div>
        </div>)}</div>
      </div>
    </div>

    {/* PRIVACY */}
    <div className="s">
      <div className="stag">{l==="eu"?"PRIBATUTASUNA ETA SEGURTASUNA":"PRIVACIDAD Y SEGURIDAD"}</div>
      <h2 className="sh">{t.privacy.title}</h2>
      <div className="pg">{t.privacy.items.map((p,i)=><div key={i} className="pc"><div className="pi">{p.icon}</div><div className="pt">{p.t}</div><div className="pd2">{p.d}</div></div>)}</div>
    </div>

    {/* PLATFORM ACCORDION */}
    <PlatformSection l={l} sectionRef={platformRef}/>

    {/* CTA */}
    <div className="ctab"><h2>{t.cta_block.title}</h2><p>{t.cta_block.sub}</p><button className="btn bw" onClick={onDemo}>{t.cta_block.btn}</button></div>

    <footer><p>{t.footer.copy}</p></footer>
  </>);
}

// ── Tour tooltips config ──────────────────────────────────────────────────────
const TOUR_ES = [
  { role:"profe", title:"👋 Bienvenido al tour de Klaizen", body:"Te guiamos por las 5 pantallas clave. Empieza con la vista del docente: aquí verás el dashboard con el estado real del aula.", btn:"Empezar tour →" },
  { role:"profe", title:"📊 Paso 1 · Dashboard del aula", body:"El docente ve las 6 dimensiones de bienestar medidas, alertas automáticas y una recomendación generada por IA basada en el diagnóstico.", btn:"Siguiente →" },
  { role:"profe", title:"🎯 Paso 2 · Áreas de mejora", body:"Klaizen identifica qué dimensiones necesitan atención y por qué. Todo con semáforos claros y contexto para actuar.", btn:"Siguiente →" },
  { role:"profe", title:"⚡ Paso 3 · Intervención recomendada", body:"El sistema propone actividades concretas adaptadas al diagnóstico. El docente elige y puede previsualizarlas antes de lanzarlas.", btn:"Siguiente →" },
  { role:"alumno", title:"🧑‍🎓 Ahora: vista del alumnado", body:"Cambiamos a la vista del alumno/a. Así es como los estudiantes hacen el check-in: 12 preguntas anónimas en 3 minutos.", btn:"Ver check-in →" },
  { role:"alumno", title:"✅ Tour completado", body:"Esto es Klaizen: diagnóstico → intervención → impacto, todo en un ciclo continuo. ¿Quieres probarlo en tu centro?", btn:"Solicitar demo gratuita" },
];
const TOUR_EU = [
  { role:"profe", title:"👋 Ongi etorri Klaizenren tourrera", body:"5 pantaila nagusitan gidatuko zaitugu. Irakaslearen ikuspegitik hasten gara: hemen ikusiko duzu gelaren benetako egoeraren dashboard-a.", btn:"Tourra hasi →" },
  { role:"profe", title:"📊 1. urratsa · Gelako dashboard-a", body:"Irakasleak 6 ongizate dimentsio ikusten ditu neurtuta, ohartarazpen automatikoak eta AAk diagnostikoan oinarritutako gomendioa.", btn:"Hurrengoa →" },
  { role:"profe", title:"🎯 2. urratsa · Hobetze-eremuak", body:"Klaizenk zein dimentsio behar duen arreta identifikatzen du eta zergatik. Dena semaforo argiekin eta testuinguruz jarduteko.", btn:"Hurrengoa →" },
  { role:"profe", title:"⚡ 3. urratsa · Gomendatutako esku-hartzea", body:"Sistemak diagnostikoari egokitutako jarduera zehatzak proposatzen ditu. Irakasleak aukeratu eta aurreikusi dezake abian jarri aurretik.", btn:"Hurrengoa →" },
  { role:"alumno", title:"🧑‍🎓 Orain: ikasleen ikuspegia", body:"Ikaslearen ikuspegira aldatzen gara. Horrela egiten dute ikasleak check-in-a: 12 galdera anonimo 3 minututan.", btn:"Check-in ikusi →" },
  { role:"alumno", title:"✅ Tourra osatu da", body:"Hau da Klaizen: diagnostikoa → esku-hartzea → eragina, ziklo jarraitu batean. Zure ikastetxean probatu nahi al duzu?", btn:"Demo doakoa eskatu" },
];

// ── Demo modal ────────────────────────────────────────────────────────────────
const demoCss = `
.modal-overlay{position:fixed;inset:0;z-index:400;background:rgba(0,0,0,.55);backdrop-filter:blur(4px);display:flex;align-items:center;justify-content:center;padding:20px;animation:fi .2s ease;}
.modal{background:white;border-radius:20px;padding:36px;width:100%;max-width:480px;box-shadow:0 24px 60px rgba(0,0,0,.15);animation:up .3s ease;}
.modal-close{position:absolute;top:16px;right:16px;width:32px;height:32px;border-radius:50%;border:none;background:#f5f5f5;cursor:pointer;font-size:16px;display:flex;align-items:center;justify-content:center;}
.modal-close:hover{background:#eee;}
.modal h2{font-size:22px;font-weight:800;color:#1a1a2e;margin-bottom:6px;letter-spacing:-.4px;}
.modal p{font-size:13px;color:#666;margin-bottom:24px;line-height:1.5;}
.field{margin-bottom:16px;}
.field label{display:block;font-size:12px;font-weight:700;color:#1a1a2e;margin-bottom:5px;}
.field input,.field select{width:100%;padding:11px 14px;border:1.5px solid #eee;border-radius:9px;font-size:14px;font-family:'Plus Jakarta Sans',sans-serif;outline:none;transition:border .2s;color:#1a1a2e;background:white;}
.field input:focus,.field select:focus{border-color:#FF6B35;}
.field input::placeholder{color:#ccc;}
.modal-sent{text-align:center;padding:20px 0;}
.modal-sent-icon{font-size:52px;margin-bottom:14px;}
.modal-sent h3{font-size:20px;font-weight:800;margin-bottom:8px;}
.modal-sent p{font-size:13px;color:#666;line-height:1.55;}
.tour-tooltip{position:sticky;top:0;z-index:20;margin:-18px -18px 18px;background:linear-gradient(135deg,#FF6B35,#ff4500);border-radius:0 0 16px 16px;padding:18px 20px;}
.tour-progress{display:flex;gap:5px;margin-bottom:12px;}
.tour-pip{height:3px;border-radius:3px;flex:1;background:rgba(255,255,255,.3);transition:background .3s;}
.tour-pip.done{background:white;}
.tour-title{font-size:14px;font-weight:800;color:white;margin-bottom:4px;}
.tour-body{font-size:12px;color:rgba(255,255,255,.88);line-height:1.5;margin-bottom:12px;}
.tour-btns{display:flex;gap:8px;align-items:center;}
.tour-skip{font-size:11px;color:rgba(255,255,255,.65);background:none;border:none;cursor:pointer;padding:0;}
.tour-skip:hover{color:white;}
`;

function DemoModal({l, onClose}){
  const [sent, setSent] = useState(false);
  const [form, setForm] = useState({name:"", email:"", centro:"", rol:"tutor"});
  const isEs = l !== "eu";

  const roles = isEs
    ? [{v:"tutor",lb:"Tutor/a"},{v:"orientacion",lb:"Orientación"},{v:"direccion",lb:"Dirección"},{v:"otro",lb:"Otro"}]
    : [{v:"tutor",lb:"Tutore/a"},{v:"orientacion",lb:"Orientazioa"},{v:"direccion",lb:"Zuzendaritza"},{v:"otro",lb:"Beste bat"}];

  function handleSubmit(){
    if(!form.name||!form.email||!form.centro) return;
    setSent(true);
  }

  return(
    <div className="modal-overlay" onClick={e=>{if(e.target===e.currentTarget)onClose();}}>
      <div className="modal" style={{position:"relative"}}>
        <button className="modal-close" onClick={onClose}>✕</button>
        {!sent ? (<>
          <h2>{isEs?"Solicita tu demo gratuita":"Zure demo doakoa eskatu"}</h2>
          <p>{isEs?"Te contactamos en menos de 24h para mostrarte Klaizen en acción. Sin compromiso.":"24 ordutan baino gutxiagotan kontaktatuko zaitugu Klaizen erakusteko. Konpromiso gabe."}</p>
          <div className="field">
            <label>{isEs?"Nombre y apellidos":"Izena eta abizenak"}</label>
            <input placeholder={isEs?"Ej: Miren Etxeberria":"Adib.: Miren Etxeberria"} value={form.name} onChange={e=>setForm(f=>({...f,name:e.target.value}))}/>
          </div>
          <div className="field">
            <label>{isEs?"Email profesional":"Posta elektroniko profesionala"}</label>
            <input type="email" placeholder={isEs?"Ej: miren@ikastetxea.eus":"Adib.: miren@ikastetxea.eus"} value={form.email} onChange={e=>setForm(f=>({...f,email:e.target.value}))}/>
          </div>
          <div className="field">
            <label>{isEs?"Centro educativo":"Ikastetxea"}</label>
            <input placeholder={isEs?"Nombre del centro":"Ikastetxearen izena"} value={form.centro} onChange={e=>setForm(f=>({...f,centro:e.target.value}))}/>
          </div>
          <div className="field">
            <label>{isEs?"Tu rol en el centro":"Zure rola ikastetxean"}</label>
            <select value={form.rol} onChange={e=>setForm(f=>({...f,rol:e.target.value}))}>
              {roles.map(r=><option key={r.v} value={r.v}>{r.lb}</option>)}
            </select>
          </div>
          <button className="btn bp" style={{width:"100%",justifyContent:"center",marginTop:4}}
            onClick={handleSubmit}
            disabled={!form.name||!form.email||!form.centro}
            style={{width:"100%",justifyContent:"center",marginTop:4,opacity:(!form.name||!form.email||!form.centro)?0.4:1}}>
            {isEs?"Enviar solicitud →":"Eskaera bidali →"}
          </button>
          <p style={{fontSize:11,color:"#aaa",textAlign:"center",marginTop:10}}>{isEs?"Sin spam. Solo te escribimos para coordinar la demo.":"Spamik ez. Demo koordinatzeko soilik idatziko dizugu."}</p>
        </>) : (
          <div className="modal-sent">
            <div className="modal-sent-icon">🎉</div>
            <h3>{isEs?"¡Solicitud recibida!":"Eskaera jasota!"}</h3>
            <p>{isEs?`Gracias, ${form.name.split(" ")[0]}. Nos ponemos en contacto contigo en menos de 24h para mostrarte Klaizen en tu centro.`:`Eskerrik asko, ${form.name.split(" ")[0]}. 24 ordutan baino gutxiagotan kontaktatuko zaitugu Klaizen zure ikastetxean erakusteko.`}</p>
            <button className="btn bp bs" style={{marginTop:20}} onClick={onClose}>{isEs?"Cerrar":"Itxi"}</button>
          </div>
        )}
      </div>
    </div>
  );
}

// ── How It Works Panel (Ver cómo funciona) ────────────────────────────────────
function TourPanel({l, onClose, onRequestDemo}){
  const isEs = l !== "eu";
  const t = isEs ? T.es : T.eu;
  const [tab, setTab] = useState("tour"); // "tour" | "pdf"
  const [role, setRole] = useState("profe");

  const pdfReports = [
    {
      icon:"📊", b64: PDF_DIAG,
      titleEs:"Informe de diagnóstico de aula", titleEu:"Gelako diagnostiko txostena",
      subEs:"Dashboard con 6 dimensiones, alertas activas, evolución semanal y recomendación IA.", subEu:"6 dimentsioko dashboard-a, alerta aktiboak, aste-bilakaera eta AA-ren gomendioa.",
      accEs:"Tutores/as · Orientación", accEu:"Tutore/ak · Orientazioa",
      file:"klaizen_diagnostico_aula.pdf", pages:"2 páginas",
    },
    {
      icon:"🏫", b64: PDF_COMP,
      titleEs:"Comparativa entre grupos del centro", titleEu:"Zentroko taldeen arteko konparaketa",
      subEs:"Visión global del centro, grupos prioritarios y media por dimensión.", subEu:"Zentroko ikuspegi orokorra, talde lehentasunak eta dimentsioko batezbestekoa.",
      accEs:"Orientación · Dirección", accEu:"Orientazioa · Zuzendaritza",
      file:"klaizen_comparativa_grupos.pdf", pages:"1 página",
    },
    {
      icon:"📈", b64: PDF_IMPA,
      titleEs:"Informe de impacto de intervención", titleEu:"Esku-hartzearen eraginaren txostena",
      subEs:"Comparativa antes/después, tabla completa de cambios y conclusiones con recomendaciones.", subEu:"Aurretik/ostean konparaketa, aldaketen taula osoa eta ondorioak.",
      accEs:"Tutores/as · Orientación · Dirección", accEu:"Tutore/ak · Orientazioa · Zuzendaritza",
      file:"klaizen_impacto_intervencion.pdf", pages:"2 páginas",
    },
  ];

  return(
    <div className="panel" onClick={e=>{if(e.target===e.currentTarget)onClose();}}>
      <div className="sheet">
        {/* Header */}
        <div className="ah">
          <div className="alogo"><KlaizenLogoSmall size={22}/><span style={{color:"#3a3a3a",fontWeight:800}}>Klaizen</span></div>
          <div style={{display:"flex",gap:3,background:"#f5f5f5",padding:"3px",borderRadius:7}}>
            <button className={`atab ${tab==="tour"?"on":""}`} onClick={()=>setTab("tour")}>
              {isEs?"Explorar app":"App probatu"}
            </button>
            <button className={`atab ${tab==="pdf"?"on":""}`} onClick={()=>setTab("pdf")}>
              {isEs?"Informes PDF":"PDF txostenak"}
            </button>
          </div>
          <button className="xbtn" onClick={onClose}>✕</button>
        </div>

        {tab==="tour" && (
          <div className="ab" style={{paddingTop:0}}>
            {/* Guided banner */}
            <div style={{background:"linear-gradient(135deg,#FF6B35,#ff4500)",padding:"14px 18px",margin:"0 0 0 0"}}>
              <div style={{fontSize:11,fontWeight:700,color:"rgba(255,255,255,.8)",letterSpacing:"1px",textTransform:"uppercase",marginBottom:4}}>
                {isEs?"TOUR GUIADO · PROTOTIPO INTERACTIVO":"GIDATUTAKO TOURRA · PROTOTIPO INTERAKTIBOA"}
              </div>
              <div style={{fontSize:13,color:"white",lineHeight:1.45,marginBottom:10}}>
                {isEs?"Explora el flujo completo: check-in del alumnado, dashboard del docente, ciclo de intervención y medición de impacto.":"Ziklo osoa esploratu: ikasleen check-in-a, irakaslearen dashboard-a, esku-hartzeen zikloa eta eraginaren neurketa."}
              </div>
              <div style={{display:"flex",gap:6}}>
                <button
                  className={`atab ${role==="profe"?"on":""}`}
                  style={{background:role==="profe"?"white":"rgba(255,255,255,.25)",color:role==="profe"?"#FF6B35":"white",border:"none",padding:"6px 14px",borderRadius:6,fontSize:12,fontWeight:700,cursor:"pointer"}}
                  onClick={()=>setRole("profe")}>
                  {isEs?"👩‍🏫 Docente":"👩‍🏫 Irakaslea"}
                </button>
                <button
                  className={`atab ${role==="alumno"?"on":""}`}
                  style={{background:role==="alumno"?"white":"rgba(255,255,255,.25)",color:role==="alumno"?"#FF6B35":"white",border:"none",padding:"6px 14px",borderRadius:6,fontSize:12,fontWeight:700,cursor:"pointer"}}
                  onClick={()=>setRole("alumno")}>
                  {isEs?"🧑‍🎓 Alumno/a":"🧑‍🎓 Ikaslea"}
                </button>
                <button
                  style={{marginLeft:"auto",background:"white",color:"#FF6B35",border:"none",padding:"6px 14px",borderRadius:6,fontSize:12,fontWeight:700,cursor:"pointer"}}
                  onClick={()=>setTab("pdf")}>
                  {isEs?"Ver informes PDF →":"PDF txostenak ikusi →"}
                </button>
              </div>
            </div>
            {role==="profe" ? <ProfeV key={`tp${l}`} l={l}/> : <AlumnoV key={`ta${l}`} l={l}/>}
          </div>
        )}

        {tab==="pdf" && (
          <div className="ab">
            {/* PDF section header */}
            <div style={{background:"linear-gradient(135deg,#1a1a2e,#2d2d4e)",borderRadius:14,padding:"20px",marginBottom:16}}>
              <div style={{fontSize:11,fontWeight:700,letterSpacing:"1.2px",textTransform:"uppercase",color:"#FF6B35",marginBottom:6}}>
                {isEs?"INFORMES PROFESIONALES · DESCARGA GRATIS":"TXOSTEN PROFESIONALAK · DESKARGA DOAN"}
              </div>
              <div style={{fontSize:15,fontWeight:800,color:"white",marginBottom:6,lineHeight:1.3}}>
                {isEs?"¿Qué ven el profesorado, orientación y dirección?":"Zer ikusten dute irakasleek, orientazioak eta zuzendaritzak?"}
              </div>
              <div style={{fontSize:12,color:"rgba(255,255,255,.65)",lineHeight:1.5}}>
                {isEs?"Descarga ejemplos reales de los 3 tipos de informe que genera Klaizen automáticamente tras cada diagnóstico.":"Deskargatu Klaizenk diagnostiko bakoitzaren ostean automatikoki sortzen dituen 3 txosten moten benetako adibideak."}
              </div>
            </div>

            {pdfReports.map((p,i)=>(
              <div key={i} style={{background:"white",border:"1.5px solid #f0f0f0",borderRadius:14,padding:"18px",marginBottom:12}}>
                <div style={{display:"flex",gap:12,alignItems:"flex-start",marginBottom:12}}>
                  <div style={{width:46,height:46,borderRadius:12,background:"#f8f8fa",border:"1px solid #eee",display:"flex",alignItems:"center",justifyContent:"center",fontSize:22,flexShrink:0}}>{p.icon}</div>
                  <div style={{flex:1}}>
                    <div style={{fontSize:13,fontWeight:800,color:"#1a1a2e",marginBottom:3}}>{isEs?p.titleEs:p.titleEu}</div>
                    <div style={{fontSize:11,color:"#888",lineHeight:1.45,marginBottom:5}}>{isEs?p.subEs:p.subEu}</div>
                    <div style={{display:"flex",gap:8,flexWrap:"wrap"}}>
                      <span style={{fontSize:10,fontWeight:600,padding:"2px 8px",borderRadius:999,background:"#FFF0EB",color:"#FF6B35"}}>
                        {isEs?"Acceso:":"Sarbidea:"} {isEs?p.accEs:p.accEu}
                      </span>
                      <span style={{fontSize:10,fontWeight:600,padding:"2px 8px",borderRadius:999,background:"#f5f5f5",color:"#888"}}>{p.pages}</span>
                    </div>
                  </div>
                </div>
                <button
                  className="btn bp"
                  style={{width:"100%",justifyContent:"center",gap:8}}
                  onClick={()=>downloadPDF(p.b64, p.file)}>
                  ⬇ {isEs?"Descargar PDF de muestra":"Lagin PDF deskargatu"}
                </button>
              </div>
            ))}

            <div style={{background:"#f8f8fa",borderRadius:12,padding:"16px",marginTop:4}}>
              <div style={{fontSize:13,fontWeight:700,color:"#1a1a2e",marginBottom:4}}>
                {isEs?"¿Quieres ver Klaizen en tu centro?":"Klaizen zure ikastetxean ikusi nahi al duzu?"}
              </div>
              <div style={{fontSize:12,color:"#888",marginBottom:12}}>
                {isEs?"Demo gratuita de 30 minutos, sin compromiso.":"30 minutuko demo doakoa, konpromiso gabe."}
              </div>
              <button className="btn bp" style={{width:"100%",justifyContent:"center"}} onClick={()=>{onClose();onRequestDemo();}}>
                {isEs?"Solicitar demo gratuita →":"Demo doakoa eskatu →"}
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

// ── Unified App Panel (explore freely + opt-in tour) ─────────────────────────
function AppPanel({l, onClose, onRequestDemo}){
  const [role, setRole] = useState("profe");
  const [tourActive, setTourActive] = useState(false);
  const [tourStep, setTourStep] = useState(0);
  const steps = l==="eu" ? TOUR_EU : TOUR_ES;
  const current = steps[tourStep];
  const isLast = tourStep === steps.length - 1;
  const isEs = l !== "eu";

  function tourAdvance(){
    if(isLast){ setTourActive(false); setTourStep(0); onClose(); onRequestDemo(); return; }
    const next = steps[tourStep+1];
    setRole(next.role);
    setTourStep(s=>s+1);
  }
  function startTour(){ setTourStep(0); setRole(steps[0].role); setTourActive(true); }
  function stopTour(){ setTourActive(false); setTourStep(0); }

  return(
    <div className="panel" onClick={e=>{if(e.target===e.currentTarget)onClose();}}>
      <div className="sheet">
        <div className="ah" style={{gap:8}}>
          <div className="alogo"><KlaizenLogoSmall size={22}/><span style={{color:"#3a3a3a",fontWeight:800}}>Klaizen</span></div>
          <div className="atabs">
            <button className={`atab ${role==="profe"?"on":""}`} onClick={()=>{setRole("profe");stopTour();}}>
              {isEs?"Docente":"Irakaslea"}
            </button>
            <button className={`atab ${role==="alumno"?"on":""}`} onClick={()=>{setRole("alumno");stopTour();}}>
              {isEs?"Alumno/a":"Ikaslea"}
            </button>
          </div>
          {/* Tour opt-in button — subtle, not intrusive */}
          {!tourActive
            ? <button onClick={startTour} title={isEs?"Activar tour guiado":"Tour gidatua aktibatu"} style={{
                fontSize:11,fontWeight:600,color:"#FF6B35",
                background:"#FFF0EB",border:"1px solid #ffd4c0",
                borderRadius:999,padding:"5px 11px",cursor:"pointer",
                whiteSpace:"nowrap",marginLeft:"auto",flexShrink:0,
              }}>
                🗺 {isEs?"Tour guiado":"Tour gidatua"}
              </button>
            : <button onClick={stopTour} style={{
                fontSize:11,color:"#aaa",background:"none",border:"none",
                cursor:"pointer",marginLeft:"auto",flexShrink:0,
              }}>
                {isEs?"Salir del tour ✕":"Tourra utzi ✕"}
              </button>
          }
          <button className="xbtn" onClick={onClose}>✕</button>
        </div>

        <div className="ab" style={{paddingTop:0}}>
          {/* Tour tooltip — only visible when user activates it */}
          {tourActive&&(
            <div className="tour-tooltip">
              <div className="tour-progress">
                {steps.map((_,i)=><div key={i} className={`tour-pip ${i<=tourStep?"done":""}`}/>)}
              </div>
              <div className="tour-title">{current.title}</div>
              <div className="tour-body">{current.body}</div>
              <div className="tour-btns">
                <button className="btn bw bs" style={{padding:"7px 16px",fontSize:12}} onClick={tourAdvance}>{current.btn}</button>
                <button className="tour-skip" onClick={stopTour}>{isEs?"Saltar tour":"Tourra saltatu"}</button>
              </div>
            </div>
          )}
          {role==="profe" ? <ProfeV key={`p${l}`} l={l}/> : <AlumnoV key={`a${l}`} l={l}/>}
        </div>
      </div>
    </div>
  );
}

// ── Pricing Modal ─────────────────────────────────────────────────────────────
const PLANS_ES = [
  {
    id:"aula", icon:"🌱", name:"Plan Aula", badge:null, price:"0€", period:"gratis para siempre",
    tagline:"Pruébalo sin riesgo. Sin tarjeta.",
    highlight:"Empieza hoy con una clase y comprueba el impacto.",
    features:["1 clase","Diagnóstico del aula","1–2 ejercicios guiados","1 medición de impacto","Informe descargable"],
    missing:["Dashboard de centro","Comparativas entre clases"],
    cta:"Empezar gratis", ctaStyle:"outline",
  },
  {
    id:"starter", icon:"🚀", name:"Plan Starter", badge:null, price:"490€", period:"/ año",
    tagline:"Para tutores que quieren ir más allá.",
    highlight:"Hasta 4 clases con seguimiento y soporte.",
    features:["Hasta 4 clases","Diagnóstico + intervenciones","Seguimiento básico","Informes descargables","Soporte por email"],
    missing:[],
    cta:"Solicitar demo", ctaStyle:"outline",
  },
  {
    id:"pro", icon:"🧠", name:"Plan Pro", badge:"Recomendado", price:"1.290€", period:"/ año",
    tagline:"El más elegido por equipos de orientación.",
    highlight:"Dashboard de centro, comparativas y acompañamiento incluido.",
    features:["Hasta 12 clases","Dashboard de centro","Comparativas entre clases","Histórico de evolución","Biblioteca ampliada de ejercicios","1 sesión de acompañamiento"],
    missing:[],
    cta:"Solicitar demo", ctaStyle:"primary",
  },
  {
    id:"centro", icon:"🏫", name:"Plan Centro Completo", badge:null, price:"2.490€", period:"/ año",
    tagline:"Para centros que apuestan por el bienestar como eje.",
    highlight:"Clases ilimitadas, formación al profesorado y soporte prioritario.",
    features:["Clases ilimitadas","Dashboard completo","Informes avanzados","Seguimiento continuo","Formación al profesorado","Soporte prioritario"],
    missing:[],
    cta:"Solicitar demo", ctaStyle:"outline",
  },
  {
    id:"inst", icon:"🏛️", name:"Plan Institucional", badge:null, price:"A medida", period:"",
    tagline:"Para redes de centros, ikastolas y administraciones.",
    highlight:"Implementación en múltiples centros con datos agregados y acompañamiento estratégico.",
    features:["Múltiples centros","Datos agregados","Acompañamiento estratégico","Formación centralizada","Informe institucional"],
    missing:[],
    cta:"Contactar", ctaStyle:"outline",
  },
];

const PLANS_EU = [
  {
    id:"aula", icon:"🌱", name:"Gela Plana", badge:null, price:"0€", period:"betirako doan",
    tagline:"Arriskurik gabe probatu. Txartelarik gabe.",
    highlight:"Hasi gaur gela batekin eta eragina egiaztatu.",
    features:["1 gela","Gelako diagnostikoa","1–2 jarduera gidatu","1 eraginaren neurketa","Txosten deskargagarria"],
    missing:["Ikastetxeko dashboard-a","Taldeen arteko konparetak"],
    cta:"Doan hasi", ctaStyle:"outline",
  },
  {
    id:"starter", icon:"🚀", name:"Starter Plana", badge:null, price:"490€", period:"/ urtean",
    tagline:"Gehiago nahi duten tutoreentzat.",
    highlight:"4 gela arte jarraipenarekin eta laguntzarekin.",
    features:["4 gela arte","Diagnostikoa + esku-hartzeak","Oinarrizko jarraipena","Txosten deskargagarriak","Email bidezko laguntza"],
    missing:[],
    cta:"Demo eskatu", ctaStyle:"outline",
  },
  {
    id:"pro", icon:"🧠", name:"Pro Plana", badge:"Gomendatua", price:"1.290€", period:"/ urtean",
    tagline:"Orientazio-taldeek gehien aukeratzen dutena.",
    highlight:"Ikastetxeko dashboard-a, konparetak eta laguntza barne.",
    features:["12 gela arte","Ikastetxeko dashboard-a","Taldeen arteko konparetak","Bilakaeraren historikoa","Jarduera-liburutegi zabaldua","1 laguntzaldi saioa"],
    missing:[],
    cta:"Demo eskatu", ctaStyle:"primary",
  },
  {
    id:"centro", icon:"🏫", name:"Ikastetxe Osoko Plana", badge:null, price:"2.490€", period:"/ urtean",
    tagline:"Ongizatea ardatz bezala apustu egiten duten ikastetxeentzat.",
    highlight:"Mugagabeko gelak, irakasleentzako prestakuntza eta lehentasunezko laguntza.",
    features:["Mugagabeko gelak","Dashboard osoa","Txosten aurreratuak","Jarraimen jarraitua","Irakasleentzako prestakuntza","Lehentasunezko laguntza"],
    missing:[],
    cta:"Demo eskatu", ctaStyle:"outline",
  },
  {
    id:"inst", icon:"🏛️", name:"Plan Instituzionala", badge:null, price:"Neurrian", period:"",
    tagline:"Ikastetxe-sareetarako, ikastoletarako eta administrazioetarako.",
    highlight:"Ikastetxe anitzetan ezarpena datu agregatuekin eta laguntza estrategikoarekin.",
    features:["Ikastetxe anitzak","Datu agregatuak","Laguntza estrategikoa","Prestakuntza zentralizatua","Txosten instituzionala"],
    missing:[],
    cta:"Harremanetan jarri", ctaStyle:"outline",
  },
];

const PFAQ_ES = [
  {q:"¿Quién paga, el centro o el profesorado?",a:"El centro educativo, no el profesorado a título individual. Klaizen es una herramienta institucional que contrata el equipo directivo u orientación. Existen planes adaptados a centros de distintos tamaños."},
  {q:"¿Cómo se implementa? ¿Es complicado?",a:"No. La implementación dura menos de una semana: configuración del centro, alta de docentes y primera sesión de diagnóstico. No requiere instalación de software ni formación técnica previa."},
  {q:"¿Cuánto tiempo necesita el profesorado?",a:"El check-in del alumnado dura 3 minutos. Revisar el dashboard y lanzar una actividad lleva entre 5 y 10 minutos. Está diseñado para no añadir carga al docente."},
  {q:"¿Se puede empezar con solo una clase?",a:"Sí, el Plan Aula es gratuito y permite empezar con una sola clase. Si ves impacto, puedes escalar al centro completo cuando quieras."},
  {q:"¿Qué pasa con los datos al finalizar la suscripción?",a:"Los datos permanecen accesibles durante 30 días tras la cancelación, período en el que puedes exportarlos. Después se eliminan de forma segura conforme al RGPD."},
];

const PFAQ_EU = [
  {q:"Nork ordaintzen du, ikastetxeak ala irakasleek?",a:"Ikastetxeak, ez irakasleek banan-banan. Klaizen ikastetxe-tresna bat da, zuzendaritzak edo orientazioak kontratatzen duena. Tamaina ezberdinetako ikastetxeetara egokitutako planak daude."},
  {q:"Nola ezartzen da? Zaila al da?",a:"Ez. Ezarpena aste bat baino gutxiago irauten du: ikastetxearen konfigurazioa, irakasleak alta ematea eta lehen diagnostiko saioa. Ez du software-instalaziorik edo aldez aurreko prestakuntza teknikorik behar."},
  {q:"Zenbat denbora behar du irakasleak?",a:"Ikasleen check-in-ak 3 minutu irauten du. Dashboard-a berrikusteak eta jarduera bat abian jartzeak 5-10 minutu artean. Irakasleari karga gehitu gabe diseinatuta dago."},
  {q:"Gela bakar batekin has al daiteke?",a:"Bai, Gela Plana doakoa da eta gela bakar batekin hasteko aukera ematen du. Eragina ikusten bada, nahi denean ikastetxe osora zabal daiteke."},
  {q:"Zer gertatzen da datuekin harpidetza amaitzean?",a:"Datuak bertan behera utzi eta gero 30 egunez eskuragarri egoten dira, aldian esportatu ahal izateko. Ondoren, EBEOren arabera modu seguruan ezabatzen dira."},
];

function PricingModal({l, onClose, onDemo}){
  const isEs = l !== "eu";
  const plans = isEs ? PLANS_ES : PLANS_EU;
  const faqs  = isEs ? PFAQ_ES  : PFAQ_EU;
  const [openFaq, setOpenFaq] = useState(null);

  return(
    <div className="modal-overlay" onClick={e=>{if(e.target===e.currentTarget)onClose();}}
      style={{alignItems:"flex-start",paddingTop:0,paddingBottom:0,overflowY:"auto"}}>
      <div style={{width:"100%",maxWidth:900,background:"white",minHeight:"100vh",position:"relative",padding:"0 0 60px"}}>

        {/* Sticky header */}
        <div style={{position:"sticky",top:0,zIndex:10,background:"white",borderBottom:"1px solid #f0f0f0",
          padding:"14px 32px",display:"flex",alignItems:"center",justifyContent:"space-between"}}>
          <div style={{display:"flex",alignItems:"center",gap:8}}>
            <KlaizenLogoSmall size={24}/>
            <span style={{fontSize:17,fontWeight:800,color:"#3a3a3a"}}>Klaizen</span>
            <span style={{fontSize:13,color:"#aaa",marginLeft:6}}>{isEs?"· Precios":"· Prezioak"}</span>
          </div>
          <button className="xbtn" onClick={onClose}>✕</button>
        </div>

        {/* Hero copy */}
        <div style={{padding:"52px 32px 40px",textAlign:"center",background:"linear-gradient(135deg,#fff8f5,#f0f4ff)"}}>
          <div style={{fontSize:11,fontWeight:700,letterSpacing:"1.5px",textTransform:"uppercase",color:"#FF6B35",marginBottom:12}}>
            {isEs?"PLANES Y PRECIOS":"PLANAK ETA PREZIOAK"}
          </div>
          <h1 style={{fontSize:"clamp(28px,4vw,44px)",fontWeight:800,letterSpacing:"-1px",color:"#1a1a2e",marginBottom:14,lineHeight:1.1}}>
            {isEs?"Empieza gratis con una clase.":"Hasi doan gela batekin."}<br/>
            <span style={{color:"#FF6B35"}}>{isEs?"Si ves impacto, escala al centro.":"Eragina ikusten baduzu, ikastetxera zabaldu."}</span>
          </h1>
          <p style={{fontSize:16,color:"#666",maxWidth:520,margin:"0 auto 24px",lineHeight:1.6}}>
            {isEs
              ?"Sin permanencia. Sin tarjeta de crédito para empezar. Cancela cuando quieras."
              :"Iraunkortasunik gabe. Txartelarik gabe hasteko. Nahi duzunean utzi."}
          </p>
          <div style={{display:"inline-flex",alignItems:"center",gap:8,padding:"10px 20px",borderRadius:999,background:"#f0fdf4",border:"1px solid #bbf7d0",fontSize:13,fontWeight:600,color:"#166534"}}>
            ✅ {isEs?"RGPD · Datos anónimos · Bilingüe ES/EU":"EBEO · Datu anonimoak · ES/EU elebitasuna"}
          </div>
        </div>

        {/* Plans grid */}
        <div style={{padding:"40px 24px",display:"grid",gridTemplateColumns:"repeat(auto-fit,minmax(220px,1fr))",gap:16,maxWidth:900,margin:"0 auto"}}>
          {plans.map(p=>(
            <div key={p.id} style={{
              borderRadius:18,border:`2px solid ${p.badge?"#FF6B35":"#eee"}`,
              padding:"24px 20px",position:"relative",background:"white",
              boxShadow:p.badge?"0 8px 32px rgba(255,107,53,.12)":"none",
              display:"flex",flexDirection:"column",
            }}>
              {/* Badge */}
              {p.badge&&<div style={{
                position:"absolute",top:-13,left:"50%",transform:"translateX(-50%)",
                background:"#FF6B35",color:"white",fontSize:11,fontWeight:700,
                padding:"4px 14px",borderRadius:999,whiteSpace:"nowrap",letterSpacing:".5px",
              }}>{p.badge}</div>}

              <div style={{fontSize:26,marginBottom:10}}>{p.icon}</div>
              <div style={{fontSize:13,fontWeight:700,color:"#FF6B35",marginBottom:4,letterSpacing:".3px"}}>{p.name}</div>
              <div style={{marginBottom:8}}>
                <span style={{fontSize:p.price==="A medida"||p.price==="Neurrian"?22:30,fontWeight:800,color:"#1a1a2e",letterSpacing:"-1px"}}>{p.price}</span>
                {p.period&&<span style={{fontSize:13,color:"#aaa",marginLeft:4}}>{p.period}</span>}
              </div>
              <div style={{fontSize:13,color:"#555",marginBottom:6,lineHeight:1.4,fontStyle:"italic"}}>{p.tagline}</div>
              <div style={{fontSize:12,fontWeight:600,color:"#1a1a2e",marginBottom:14,lineHeight:1.45,padding:"8px 10px",background:"#f8f8fa",borderRadius:8}}>{p.highlight}</div>

              {/* Features */}
              <div style={{flex:1,marginBottom:16}}>
                {p.features.map((f,i)=>(
                  <div key={i} style={{display:"flex",alignItems:"flex-start",gap:7,marginBottom:7,fontSize:12,color:"#444"}}>
                    <span style={{color:"#22c55e",fontWeight:700,flexShrink:0,marginTop:1}}>✓</span>{f}
                  </div>
                ))}
                {p.missing.map((f,i)=>(
                  <div key={i} style={{display:"flex",alignItems:"flex-start",gap:7,marginBottom:7,fontSize:12,color:"#ccc"}}>
                    <span style={{flexShrink:0,marginTop:1}}>✗</span>{f}
                  </div>
                ))}
              </div>

              {/* CTA */}
              <button
                onClick={onDemo}
                style={{
                  width:"100%",padding:"11px 0",borderRadius:9,fontFamily:"'Plus Jakarta Sans',sans-serif",
                  fontSize:13,fontWeight:700,cursor:"pointer",border:"none",
                  background:p.ctaStyle==="primary"?"#FF6B35":"white",
                  color:p.ctaStyle==="primary"?"white":"#FF6B35",
                  border:p.ctaStyle==="primary"?"none":"2px solid #FF6B35",
                  transition:"all .18s",
                }}
                onMouseEnter={e=>{e.target.style.filter="brightness(1.08)";e.target.style.transform="translateY(-1px)";}}
                onMouseLeave={e=>{e.target.style.filter="";e.target.style.transform="";}}
              >{p.cta} →</button>
            </div>
          ))}
        </div>

        {/* Value banner */}
        <div style={{margin:"0 24px 40px",background:"linear-gradient(135deg,#FF6B35,#ff4500)",borderRadius:20,padding:"32px",textAlign:"center"}}>
          <div style={{fontSize:22,fontWeight:800,color:"white",marginBottom:8,letterSpacing:"-.5px"}}>
            {isEs?"¿No sabes qué plan te conviene?":"Ez al dakizu zein plan komeni zaizun?"}
          </div>
          <div style={{fontSize:14,color:"rgba(255,255,255,.88)",marginBottom:20,lineHeight:1.55}}>
            {isEs
              ?"Cuéntanos cuántas clases tiene tu centro y te recomendamos el plan ideal. Demo de 30 minutos, sin compromiso."
              :"Esan iezaguzu zure ikastetxeak zenbat gela dituen eta plan egokiena gomendatuko dizugu. 30 minutuko demo-a, konpromiso gabe."}
          </div>
          <button className="btn bw" onClick={onDemo}>
            {isEs?"Hablar con el equipo →":"Taldearekin hitz egin →"}
          </button>
        </div>

        {/* FAQ */}
        <div style={{padding:"0 24px"}}>
          <div style={{maxWidth:640,margin:"0 auto"}}>
            <div style={{fontSize:11,fontWeight:700,letterSpacing:"1.5px",textTransform:"uppercase",color:"#FF6B35",marginBottom:10}}>
              {isEs?"PREGUNTAS FRECUENTES":"OHIKO GALDERAK"}
            </div>
            <h2 style={{fontSize:24,fontWeight:800,color:"#1a1a2e",marginBottom:24,letterSpacing:"-.5px"}}>
              {isEs?"Todo lo que necesitas saber antes de empezar":"Hasi aurretik jakin behar duzun guztia"}
            </h2>
            {faqs.map((f,i)=>(
              <div key={i} style={{borderRadius:12,border:`1.5px solid ${openFaq===i?"#FF6B35":"#eee"}`,marginBottom:8,overflow:"hidden",transition:"border-color .2s"}}>
                <button onClick={()=>setOpenFaq(openFaq===i?null:i)} style={{
                  width:"100%",display:"flex",alignItems:"center",justifyContent:"space-between",gap:12,
                  padding:"16px 20px",background:openFaq===i?"#FFF0EB":"white",border:"none",cursor:"pointer",textAlign:"left",transition:"background .2s",
                }}>
                  <span style={{fontSize:14,fontWeight:600,color:"#1a1a2e",lineHeight:1.4}}>{f.q}</span>
                  <span style={{fontSize:18,color:openFaq===i?"#FF6B35":"#ccc",flexShrink:0,
                    transition:"transform .2s",display:"inline-block",
                    transform:openFaq===i?"rotate(180deg)":"none"}}>⌄</span>
                </button>
                {openFaq===i&&(
                  <div style={{padding:"0 20px 16px",fontSize:13,color:"#555",lineHeight:1.7,animation:"up .2s ease"}}>
                    {f.a}
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

// ── About Modal ───────────────────────────────────────────────────────────────
function AboutModal({l, onClose, onDemo}){
  const isEs = l !== "eu";
  return(
    <div className="modal-overlay" onClick={e=>{if(e.target===e.currentTarget)onClose();}}>
      <div className="modal" style={{position:"relative",maxWidth:560,maxHeight:"90vh",overflowY:"auto"}}>
        <button className="modal-close" onClick={onClose}>✕</button>

        {/* Header */}
        <div style={{display:"flex",alignItems:"center",gap:10,marginBottom:20}}>
          <div style={{width:44,height:44,borderRadius:12,background:"#FFF0EB",border:"1.5px solid #ffd4c0",display:"flex",alignItems:"center",justifyContent:"center",fontSize:22}}>💙</div>
          <div>
            <div style={{fontSize:11,fontWeight:700,letterSpacing:"1px",textTransform:"uppercase",color:"#FF6B35",marginBottom:2}}>
              {isEs?"SOBRE NOSOTROS":"GURI BURUZ"}
            </div>
            <div style={{fontSize:20,fontWeight:800,color:"#1a1a2e",letterSpacing:"-.3px"}}>Klaizen</div>
          </div>
        </div>

        {/* Mission */}
        <div style={{background:"linear-gradient(135deg,#FFF0EB,#f0f4ff)",borderRadius:14,padding:"18px 20px",marginBottom:18,border:"1px solid #fde4d0"}}>
          <div style={{fontSize:11,fontWeight:700,letterSpacing:"1px",textTransform:"uppercase",color:"#FF6B35",marginBottom:8}}>
            {isEs?"NUESTRA MISIÓN":"GURE MISIOA"}
          </div>
          <div style={{fontSize:15,fontWeight:700,color:"#1a1a2e",lineHeight:1.45}}>
            {isEs
              ?"Que ningún docente tenga que adivinar cómo se siente su clase."
              :"Irakasle batek ez dezala inoiz bere gelaren egoera asmatu behar."}
          </div>
        </div>

        {/* Story */}
        <div style={{fontSize:14,color:"#555",lineHeight:1.7,marginBottom:18}}>
          {isEs
            ?<>Klaizen nace de una pregunta sencilla: <strong style={{color:"#1a1a2e"}}>¿cómo está realmente el aula?</strong> No las notas, no la asistencia — el clima emocional real, el que determina si el aprendizaje es posible.<br/><br/>
            Creamos Klaizen para que tutores, orientadores y equipos directivos de centros de secundaria del País Vasco puedan diagnosticar ese clima, actuar sobre él y medir si su intervención ha funcionado. Todo en ciclos cortos, con datos anónimos y sin añadir carga al profesorado.</>
            :<>Klaizen galdera sinple batetik sortzen da: <strong style={{color:"#1a1a2e"}}>nola dago gelaren benetako egoera?</strong> Ez notak, ez asistentzia — klima emozional erreala, ikaskuntza posible den ala ez zehaztea.<br/><br/>
            Klaizen sortu genuen Euskal Herriko bigarren hezkuntzako ikastetxeetako tutoreek, orientatzaileek eta zuzendaritza-taldeek klima hori diagnostika dezaten, haren gainean jardun dezaten eta esku-hartzea funtzionatu duen neurtu dezaten. Dena ziklo laburretan, datu anonimoekin eta irakasleari karga gehitu gabe.</>
          }
        </div>

        {/* Values */}
        <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:10,marginBottom:20}}>
          {(isEs?[
            {icon:"🔒",t:"Privacidad ante todo",d:"Datos anónimos, sin etiquetas, sin perfilado de menores."},
            {icon:"🎓",t:"Enfoque educativo",d:"No somos clínicos. Somos herramienta de apoyo al docente."},
            {icon:"🌐",t:"Raíces vascas",d:"Diseñado para la realidad de los centros del País Vasco."},
            {icon:"⚡",t:"Simple y rápido",d:"Si no cabe en una tutoría, no sirve. Esa es nuestra regla."},
          ]:[
            {icon:"🔒",t:"Pribatutasuna lehenik",d:"Datu anonimoak, etiketarik gabe, adingabeen profilerik gabe."},
            {icon:"🎓",t:"Hezkuntza-ikuspegia",d:"Ez gara klinikoak. Irakaslearen laguntzarako tresna gara."},
            {icon:"🌐",t:"Euskal sustraiak",d:"Euskal Herriko ikastetxeen errealitaterako diseinatuta."},
            {icon:"⚡",t:"Sinple eta azkarra",d:"Tutoretzan sartzen ez bada, ez du balio. Hori da gure araua."},
          ]).map((v,i)=>(
            <div key={i} style={{padding:"14px",borderRadius:12,background:"#f8f8fa",border:"1px solid #f0f0f0"}}>
              <div style={{fontSize:20,marginBottom:6}}>{v.icon}</div>
              <div style={{fontSize:13,fontWeight:700,color:"#1a1a2e",marginBottom:3}}>{v.t}</div>
              <div style={{fontSize:12,color:"#888",lineHeight:1.45}}>{v.d}</div>
            </div>
          ))}
        </div>

        {/* CTA */}
        <button className="btn bp" style={{width:"100%",justifyContent:"center"}} onClick={onDemo}>
          {isEs?"Solicitar demo gratuita →":"Demo doakoa eskatu →"}
        </button>
        <p style={{fontSize:11,color:"#aaa",textAlign:"center",marginTop:10}}>
          {isEs?"Sin compromiso. Te contactamos en menos de 24h.":"Konpromiso gabe. 24 ordutan baino gutxiagotan kontaktatuko zaitugu."}
        </p>
      </div>
    </div>
  );
}

// ── Root ──────────────────────────────────────────────────────────────────────
export default function App(){
  const [l,sl]=useState("es");
  const [open,so]=useState(false);
  const [demo,sd]=useState(false);
  const [about,sab]=useState(false);
  const [pricing,spr]=useState(false);
  const t=l==="eu"?T.eu:T.es;
  return(<>
    <style>{css}{demoCss}</style>
    <nav className="nav">
      <div className="nav-logo"><KlaizenLogo size={34}/><span style={{color:"#3a3a3a",fontWeight:800,fontSize:20,letterSpacing:"-.3px"}}>Klaizen</span></div>
      <div className="nav-links">
        <button className="nl" onClick={()=>sab(true)}>{t.nav.about}</button>
        <button className="nl" onClick={()=>document.getElementById("klaizen-platform")?.scrollIntoView({behavior:"smooth"})}>{t.nav.features}</button>
        <button className="nl" onClick={()=>spr(true)}>{t.nav.pricing}</button>
      </div>
      <div className="nav-r">
        <button className={`lang ${l==="es"?"on":""}`} onClick={()=>sl("es")}>ES</button>
        <button className={`lang ${l==="eu"?"on":""}`} onClick={()=>sl("eu")}>EU</button>
        <button className="btn bo bs" onClick={()=>so(true)}>{t.nav.login}</button>
        <button className="btn bp bs" onClick={()=>sd(true)}>{t.nav.cta}</button>
      </div>
    </nav>
    <Landing l={l} onApp={()=>so(true)} onTour={()=>so(true)} onDemo={()=>sd(true)} onPlatform={()=>document.getElementById("klaizen-platform")?.scrollIntoView({behavior:"smooth"})}/>
    {open && <AppPanel l={l} onClose={()=>so(false)} onRequestDemo={()=>sd(true)}/>}
    {demo  && <DemoModal l={l} onClose={()=>sd(false)}/>}
    {about && <AboutModal l={l} onClose={()=>sab(false)} onDemo={()=>{sab(false);sd(true);}}/> }
    {pricing && <PricingModal l={l} onClose={()=>spr(false)} onDemo={()=>{spr(false);sd(true);}}/> }
  </>);
}

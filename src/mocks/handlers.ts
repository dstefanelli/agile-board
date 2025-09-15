import { http, HttpResponse } from 'msw'

//const AUTH_TOKEN = "fmwlkfm-jetoe-123432r42"
 
export const handlers = [
  http.get('https://api.example.com/user', () => {
    return HttpResponse.json({
      id: 'abc-123',
      firstName: 'John',
      lastName: 'Maverick',
    })
  }),
]
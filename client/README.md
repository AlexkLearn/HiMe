Auth Routes:
  - '/auth/signup'  => POST
  - '/auth/login'  => POST
  - '/auth/logout'  => POST
  - '/auth/check'  => GET


Message Routes:
  - '/message/preview' => GET -> sidebar preview
  - '/message/:id' => GET -> opened chat
  - '/message/send/:id' => POST -> send message


Profile Routes:
  - '/profile' => PATCH -> update profilepic
  - '/profile' => POST -> set profile
  - '/profile/username' => PATCH -> update username
  - '/profile/bio' => PATCH -> update bio
// Schema for user object

/** 
 *  @swagger
 *  components:
 *    schemas:
 *      User:
 *        type: object
 *        required:
 *          - name
 *          - email
 *          - password
 *        properties:
 *          id:
 *              type: string
 *              example: A43423B93
 *              description: It will automatically be generated when new user is creater
 *          role:
 *              type: string
 *              example: user
 *              description: It will always be set to user
 *          name:
 *              type: string
 *              example: "Sathak Uzham"
 *              description: The name of the user
 *          email:
 *              type: string
 *              example: "sathakhussam@gmail.com"
 *              description: The email of the user and also will be used for login
 *          password:
 *              type: string
 *              example: "$JOEF@GEWG&ERHER%@#ASVEV"
 *              description: The password for the user account       
 */

/**
 *  @swagger
 *    tags:
 *      name: Users
 *      description: API for handling user authentication
 */

// Get users and create user 

/**
 *  @swagger
 *    /api/v1/users:
 *      get:
 *          tags: [Users]
 *          security:
 *              - bearerAuth: []
 *          summary: get all users
 *          responses:
 *              200:
 *                  description: All the users will be retrived
 *                  content:
 *                      application/json:
 *                          schema:
 *                              type: object
 *                              properties:
 *                                  status:
 *                                      type: string
 *                                      description: This will give whether the response is success or error
 *                                  data:
 *                                      type: array
 *                                      items:
 *                                          $ref: '#components/schemas/User'
 *              401:
 *                  description: User not allowed to enter
 *                  content:
 *                      application/json:
 *                          schema:
 *                              type: object
 *                              properties:
 *                                  status:
 *                                      type: string
 *                                      description: This will show error
 *                                  message:
 *                                      type: string
 *                                      description: This will show what is the reason why there was an error
 *      post:
 *          tags: [Users]
 *          summary: Create new user
 *          requestBody:
 *              required: true
 *              content:
 *                  application/json:
 *                      schema:
 *                          type: object
 *                          required: 
 *                              - name
 *                              - email
 *                              - password
 *                          properties:
 *                              name:
 *                                  type: string         
 *                                  example: "Sathak Uzham"         
 *                              email:
 *                                  type: string
 *                                  example: "sathakhussam@gmail.com"        
 *                              password:
 *                                  type: string
 *                                  example: "helloworld123"
 *          responses:
 *              201:
 *                  description: User created successful response
 *                  content:
 *                      application/json:
 *                          schema:
 *                              type: object
 *                              properties:
 *                                  status:
 *                                      type: string
 *                                      example: success
 *                                  data:
 *                                      $ref: '#components/schemas/User'
 */

// Get seperate Users

/**
 *  @swagger
 *    /api/v1/users/find/{id}:
 *      get:
 *          tags: [Users]
 *          security:
 *              - bearerAuth: []
 *          summary: get seperate user by id
 *          parameters:
 *              - in: path
 *                name: id
 *                required: true
 *                description: Numeric ID of the user
 *                schema:
 *                    type: integer
 *          responses:
 *              200:
 *                  description: the single user will be retrieved
 *                  content:
 *                      application/json:
 *                          schema:
 *                              $ref: '#components/schemas/User'
 *              401 / 404:
 *                  description: User not allowed to enter or user not found.
 *                  content:
 *                      application/json:
 *                          schema:
 *                              type: object
 *                              properties:
 *                                  status:
 *                                      type: string
 *                                      description: This will show error
 *                                  message:
 *                                      type: string
 *                                      description: This will show what is the reason why there was an error
 */

// Login user

/**
 * @swagger
 *   /api/v1/users/login:
 *     post:
 *       tags: [Users]
 *       summary: Users can login via this route
 *       requestBody:
 *         required: true
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               required:
 *                 - email
 *                 - password
 *               properties:
 *                 email:
 *                   type: string
 *                   example: sathakhussam@gmail.com
 *                 password:
 *                   type: string
 *                   example: helloworld123
 *       responses:
 *         200:
 *           description: successfully logged in
 *         400:
 *           description: password is wrong or user not found
 */


// Get seperate Users by email

/**
 *  @swagger
 *    /api/v1/users/detail/{email}:
 *      get:
 *          tags: [Users]
 *          security:
 *              - bearerAuth: []
 *          summary: get seperate user by email
 *          parameters:
 *              - in: path
 *                name: email
 *                required: true
 *                description: Email of the user
 *                schema:
 *                    type: string
 *                    example: "sathakhussam@gmail.com"
 *          responses:
 *              200:
 *                  description: the single user will be retrieved
 *                  content:
 *                      application/json:
 *                          schema:
 *                              $ref: '#components/schemas/User'
 *              401 / 404:
 *                  description: User not allowed to enter or user not found.
 *                  content:
 *                      application/json:
 *                          schema:
 *                              type: object
 *                              properties:
 *                                  status:
 *                                      type: string
 *                                      description: This will show error
 *                                  message:
 *                                      type: string
 *                                      description: This will show what is the reason why there was an error
 *      delete:
 *          tags: [Users]
 *          security:
 *              - bearerAuth: []
 *          summary: Delete a user
 *          parameters:
 *              - in: path
 *                name: email
 *                required: true
 *                description: Email of the user
 *                schema:
 *                    type: string
 *                    example: "sathakhussam@gmail.com"
 *          responses:
 *              200:
 *                  description: the single user will be delete
 *                  content:
 *                      application/json:
 *                          schema:
 *                              type: object
 *                              properties:
 *                                  status:
 *                                      type: string
 *                                      example: success
 *                                  data:
 *                                      type: string
 *                                      example: null
 *              401 / 404:
 *                  description: User not allowed to enter or user not found.
 *                  content:
 *                      application/json:
 *                          schema:
 *                              type: object
 *                              properties:
 *                                  status:
 *                                      type: string
 *                                      description: This will show error
 *                                  message:
 *                                      type: string
 *                                      description: This will show what is the reason why there was an error
 */

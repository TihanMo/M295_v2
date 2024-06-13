/**
 * @swagger
 * /login:
 *   post:
 *     summary: User login
 *     description: Login with email and password
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               email:
 *                 type: string
 *                 example: admin
 *               password:
 *                 type: string
 *                 example: password
 *     responses:
 *       200:
 *         description: Login successful
 *       401:
 *         description: Invalid email or password
 */

/**
 * @swagger
 * /verify:
 *   get:
 *     summary: Verify user login
 *     description: Verify if the user is logged in
 *     responses:
 *       200:
 *         description: User is logged in
 *       401:
 *         description: User not logged in
 */

/**
 * @swagger
 * /books:
 *   get:
 *     summary: Get list of books
 *     description: Retrieve a list of all books
 *     responses:
 *       200:
 *         description: A list of books
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   isbn:
 *                     type: string
 *                     example: "978-3-16-148410-0"
 *                   title:
 *                     type: string
 *                     example: "The Great Gatsby"
 *                   author:
 *                     type: string
 *                     example: "F. Scott Fitzgerald"
 *                   publisher:
 *                     type: string
 *                     example: "Scribner"
 *                   year:
 *                     type: integer
 *                     example: 1925
 */

/**
 * @swagger
 * /books/{isbn}:
 *   get:
 *     summary: Get book by ISBN
 *     description: Retrieve a book by its ISBN
 *     parameters:
 *       - name: isbn
 *         in: path
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: A book object
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 isbn:
 *                   type: string
 *                   example: "978-3-16-148410-0"
 *                 title:
 *                   type: string
 *                   example: "The Great Gatsby"
 *                 author:
 *                   type: string
 *                   example: "F. Scott Fitzgerald"
 *                 publisher:
 *                   type: string
 *                   example: "Scribner"
 *                 year:
 *                   type: integer
 *                   example: 1925
 *       404:
 *         description: Book not found
 */

/**
 * @swagger
 * /books:
 *   post:
 *     summary: Add a new book
 *     description: Add a new book to the collection
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               isbn:
 *                 type: string
 *                 example: "978-3-16-148410-0"
 *               title:
 *                 type: string
 *                 example: "The Great Gatsby"
 *               author:
 *                 type: string
 *                 example: "F. Scott Fitzgerald"
 *               publisher:
 *                 type: string
 *                 example: "Scribner"
 *               year:
 *                 type: integer
 *                 example: 1925
 *     responses:
 *       200:
 *         description: Book added successfully
 *       400:
 *         description: Invalid input
 */

/**
 * @swagger
 * /books/{isbn}:
 *   put:
 *     summary: Update a book
 *     description: Update a book's details by ISBN
 *     parameters:
 *       - name: isbn
 *         in: path
 *         required: true
 *         schema:
 *           type: string
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               isbn:
 *                 type: string
 *                 example: "9781234567890"
 *               title:
 *                 type: string
 *                 example: "idk"
 *               author:
 *                 type: string
 *                 example: "rolmol"
 *               publisher:
 *                 type: string
 *                 example: "Unknown Publisher"
 *               year:
 *                 type: integer
 *                 example: 2069
 *     responses:
 *       200:
 *         description: Book updated successfully
 *       400:
 *         description: Invalid input
 *       404:
 *         description: Book not found
 */

/**
 * @swagger
 * /books/{isbn}:
 *   patch:
 *     summary: Partially update a book
 *     description: Partially update a book's details by ISBN
 *     parameters:
 *       - name: isbn
 *         in: path
 *         required: true
 *         schema:
 *           type: string
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               title:
 *                 type: string
 *                 example: "The bad Gatsby"
 *     responses:
 *       200:
 *         description: Book updated successfully
 *       400:
 *         description: Invalid input
 *       404:
 *         description: Book not found
 */

/**
 * @swagger
 * /books/{isbn}:
 *   delete:
 *     summary: Delete a book
 *     description: Delete a book by its ISBN
 *     parameters:
 *       - name: isbn
 *         in: path
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Book deleted successfully
 *       404:
 *         description: Book not found
 */

/**
 * @swagger
 * /lends:
 *   get:
 *     summary: Get list of lends
 *     description: Retrieve a list of all lends
 *     responses:
 *       200:
 *         description: A list of lends
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   id:
 *                     type: string
 *                     example: "1"
 *                   customer_id:
 *                     type: integer
 *                     example: 1
 *                   isbn:
 *                     type: string
 *                     example: "724895934-0"
 *                   borrowed_at:
 *                     type: string
 *                     format: date-time
 *                     example: "2021-01-01T00:00:00.000Z"
 *                   returned_at:
 *                     type: string
 *                     format: date-time
 *                     example: null
 */

/**
 * @swagger
 * /lends/{isbn}:
 *   get:
 *     summary: Get lend by ISBN
 *     description: Retrieve a lend by its ISBN
 *     parameters:
 *       - name: isbn
 *         in: path
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: A lend object
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 id:
 *                   type: string
 *                   example: "1"
 *                 customer_id:
 *                   type: integer
 *                   example: 1
 *                 isbn:
 *                   type: string
 *                   example: "724895934-0"
 *                 borrowed_at:
 *                   type: string
 *                   format: date-time
 *                   example: "2021-01-01T00:00:00.000Z"
 *                 returned_at:
 *                   type: string
 *                   format: date-time
 *                   example: null
 *       404:
 *         description: Lend not found
 */

/**
 * @swagger
 * /lends:
 *   post:
 *     summary: Add a new lend
 *     description: Add a new lend to the collection
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               customer_id:
 *                 type: integer
 *                 example: 1
 *               isbn:
 *                 type: string
 *                 example: "724895934-0"
 *     responses:
 *       200:
 *         description: Lend added successfully
 *       400:
 *         description: Invalid input
 */

/**
 * @swagger
 * /lends/{isbn}:
 *   delete:
 *     summary: Delete a lend
 *     description: Delete a lend by its ISBN
 *     parameters:
 *       - name: isbn
 *         in: path
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Lend deleted successfully
 *       404:
 *         description: Lend not found
 */

/**
 * @swagger
 * /logout:
 *   delete:
 *     summary: User logout
 *     description: Logout the user
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               email:
 *                 type: string
 *                 example: admin
 *               password:
 *                 type: string
 *                 example: password
 *     responses:
 *       204:
 *         description: Logged out successfully
 *       400:
 *         description: Invalid input
 */

/**
 * @swagger
 * /verify:
 *   get:
 *     summary: Verify user logout
 *     description: Verify if the user is logged out
 *     responses:
 *       200:
 *         description: User is logged out
 *       401:
 *         description: User not logged out
 */

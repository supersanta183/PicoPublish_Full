Note: The relevant files are located in 'PicoPublish_backend/Models' as well as the program.cs file

# How to start

## Step 1: start server
The server is made with asp .net web api and can be started by running the following commands from the root folder:

```sh
cd PicoPublish_Backend
```
followed by 

```sh
dotnet run
```

## Step 2 start frontend
The frontend is made with nextjs and can be started by running the following commands in a new terminal in the root folder:

```sh
cd PicoPublish_Frontend
```

followed by

```sh
npm run dev
```

The application should now be running on 'localhost:3000'. If not, you might have to restart the frontend.

### Frontpage
![image](./frontpage.png)

### Show products
![image](./show_products.png)
![image](./show_products_end.png)

#### Show products edit
This is how a product will look like after clicking the "edit" button. Click confirm to edit the product on the server.
![image](./show_products_edit.png)

### Add product
![image](./add_product.png)

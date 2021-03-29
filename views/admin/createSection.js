<h1>Create course of <%= course.title %></h1>
<form method="POST">
    <div>
        <label for="title">Název</label>
        <input type="text" name="title" id="title" value="<%= typeof title !== "undefined" ? title : "" %>">
    </div>  
    <div>
        <label for="description">Popis</label>
        <textarea name="description" id="description"><%= typeof description !== "undefined" ? description : "" %></textarea>
    </div>  
    <input type="submit">
    <%- include("../partials/messages") %>
</form>
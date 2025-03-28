<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Project Dashboard</title>
    <link rel="stylesheet" href="{{ asset('CSS Files/dashboard_styles.css') }}">
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.0.0-beta3/css/all.min.css">
    <script src="https://cdn.jsdelivr.net/npm/apexcharts"></script>
</head>
<body>
    <div class="header">
        <a href="/public/Dashboard.html" class="logo">
            <img src="{{ asset('img/341835580_3377258052532133_4186880548703356922_n.jpg') }}" alt="CEO">
        </a>
        <div class="header-right">
            <a href="Dashboard.html">Dashboard</a>
            <a class="active" href="#projects">Projects</a>
            <a href="#archived" id="archiveLink">Archive</a>
            <a href="Profile.html" class="logo">
                <img src="" alt="Profile">
            </a>
        </div>
    </div>

    <div class="container">
        <h1 id="noProjectsText">No Projects available</h1>
        <div id="projectContainer" class="project-container"></div>
        <button id="newProjectBtn" class="btn">Add Project</button>
    </div>

    <div class="navigation-pane" id="navigationPane">
        <h2>Project List</h2>
        <ul id="projectList"></ul>
    </div>

    <div id="popupWindow" class="popup">
        <div class="popup-content">
            <span class="close-btn">&times;</span>
            <h2>Create a New Project</h2>
            <form id="projectForm">
                <label for="project-name">Project Name:</label>
                <input type="text" id="project-name" name="project-name" required><br><br>

                <label for="location">Location:</label>
                <input type="text" id="location" name="location" required><br><br>

                <label for="description">Project Description:</label>
                <textarea id="description" name="description" rows="4" cols="50" class="fixed-textarea"></textarea><br><br>
                
                <button type="submit" class="btn">Create</button>
            </form>
        </div>
    </div>

    <div id="editPopupWindow" class="popup">
        <div class="popup-content">
            <span class="close-btn">&times;</span>
            <h2>Edit Project</h2>
            <form id="editProjectForm">
                <label for="edit-project-name">Project Name:</label>
                <input type="text" id="edit-project-name" name="edit-project-name" required><br><br>

                <label for="edit-location">Location:</label>
                <input type="text" id="edit-location" name="edit-location" required><br><br>

                <label for="edit-description">Project Description:</label>
                <textarea id="edit-description" name="edit-description" rows="4" cols="50" class="fixed-textarea"></textarea><br><br>

                <button type="submit" class="btn">Update</button>
            </form>
        </div>
    </div>

    <!-- Add the missing elements -->
    <div id="archivePopupWindow" class="popup">
        <div class="popup-content">
            <span class="close-btn">&times;</span>
            <h2>Archive Projects</h2>
            <!-- Archive projects content here -->
        </div>
    </div>

    <div id="archivedProjectsContainer">
        <!-- Archived projects content here -->
    </div>

    <!-- Add a container for the chart -->
    <div id="chart"></div>

    <script src="{{ asset('JS Files/dashboard_script.js') }}"></script>
</body>
</html>
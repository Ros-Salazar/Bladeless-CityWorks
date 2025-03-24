document.addEventListener('DOMContentLoaded', () => {
    // DOM Elements declarations
    let newProjectBtn = document.getElementById('newProjectBtn');
    let popupWindow = document.getElementById('popupWindow');
    let closeBtns = document.querySelectorAll('.close-btn');
    let projectForm = document.getElementById('projectForm');
    let projectContainer = document.getElementById('projectContainer');
    let noProjectsText = document.getElementById('noProjectsText');
    let editPopupWindow = document.getElementById('editPopupWindow');
    let editProjectForm = document.getElementById('editProjectForm');
    let projectList = document.getElementById('projectList');
    let navigationPane = document.getElementById('navigationPane');
    let archiveLink = document.getElementById('archiveLink');
    let archivePopupWindow = document.getElementById('archivePopupWindow');
    let archivedProjectsContainer = document.getElementById('archivedProjectsContainer');

    // Ensure all elements are found
    if (!newProjectBtn || !popupWindow || !projectForm || !projectContainer || !noProjectsText || !editPopupWindow || !editProjectForm || !projectList || !navigationPane || !archiveLink || !archivePopupWindow || !archivedProjectsContainer) {
        console.error('One or more DOM elements are missing');
        return;
    }

    // Initialize the projects array
    let projects = JSON.parse(localStorage.getItem('projects')) || [];
    let groupData = JSON.parse(localStorage.getItem('groupData')) || [];

    // Save projects to local storage
    const saveProjects = () => {
        localStorage.setItem('projects', JSON.stringify(projects));
    };

    // Show popup when 'Add Project' is clicked
    newProjectBtn.addEventListener('click', () => {
        popupWindow.style.display = 'flex';
    });

    // Close popup
    closeBtns.forEach((btn) => {
        btn.addEventListener('click', () => {
            popupWindow.style.display = 'none';
            editPopupWindow.style.display = 'none';
            archivePopupWindow.style.display = 'none';
        });
    });

    // Add Project
    projectForm.addEventListener('submit', (event) => {
        event.preventDefault();

        const projectName = document.getElementById('project-name').value;
        const location = document.getElementById('location').value;
        const description = document.getElementById('description').value;

        const project = {
            id: Date.now().toString(),
            name: projectName,
            location: location,
            description: description,
            group: 'default',
            completion: '0%',
        };

        projects.push(project);
        saveProjects();
        loadProjects();

        projectForm.reset();
        popupWindow.style.display = 'none';
    });

    let currentProjectBox = null;

    // Redirect to Project Template
    const openProject = (projectId) => {
        const project = projects.find(p => p.id === projectId);
        if (project) {
            const projectName = encodeURIComponent(project.name);
            const projectDescription = encodeURIComponent(project.description);
            window.location.href = `ProjectTemplate.html?projectName=${projectName}&projectDescription=${projectDescription}`;
        }
    };

    // Populate Navigation Pane
    const populateNavigationPane = () => {
        projectList.innerHTML = ''; // Clear existing items
        projects.forEach((project) => {
            const li = document.createElement('li');
            li.textContent = project.name;
            li.className = project.group;
            li.addEventListener('click', () => openProject(project.id));
            projectList.appendChild(li);
        });
    };

    // Render Chart
    const renderChart = () => {
        // Filter "done" projects and group by month
        const doneProjectsByMonth = groupData.reduce((acc, group) => {
            group.rows.forEach(row => {
                if (row['Status'] === 'Done') {
                    const month = new Date(parseInt(row.id)).toLocaleString('default', { month: 'short' });
                    if (!acc[month]) {
                        acc[month] = 0;
                    }
                    acc[month]++;
                }
            });
            return acc;
        }, {});

        // Prepare data for the chart
        const categories = Object.keys(doneProjectsByMonth);
        const seriesData = Object.values(doneProjectsByMonth);

        let options = {
            chart: {
                type: 'bar'
            },
            series: [{
                name: 'Projects Completed',
                data: seriesData
            }],
            xaxis: {
                categories: categories
            }
        };

        let chart = new ApexCharts(document.querySelector("#chart"), options);
        chart.render();
    };

    // Load projects when the page is loaded
    const loadProjects = () => {
        projectContainer.innerHTML = '';

        if (projects.length === 0) {
            noProjectsText.style.display = 'block';
            return;
        }

        noProjectsText.style.display = 'none';

        projects.forEach((project) => {
            const projectBox = document.createElement('div');
            projectBox.className = 'project-box';
            projectBox.innerHTML = `
                <h3>${project.name}</h3>
                <p>${project.description}</p>
            `;
            projectBox.addEventListener('click', () => openProject(project.id));
            projectContainer.appendChild(projectBox);
        });

        populateNavigationPane();
        renderChart();
    };

    loadProjects();
});
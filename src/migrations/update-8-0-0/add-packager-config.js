"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const schematics_1 = require("@angular-devkit/schematics");
const workspace_1 = require("@nrwl/workspace");
const path_1 = require("path");
function addConfigurations() {
    return (0, workspace_1.updateWorkspaceInTree)((workspaceJson) => {
        Object.entries(workspaceJson.projects).forEach(([projectName, project]) => {
            if (!project.architect) {
                return;
            }
            Object.entries(project.architect).forEach(([targetName, targetConfig]) => {
                if (targetConfig.builder === 'nx-electron:build') {
                    const project = workspaceJson.projects[projectName];
                    let frontendProject = "{replace with frontend-app-name}";
                    project.architect['make'] = {
                        "builder": "nx-electron:make",
                        "options": {
                            "name": projectName,
                            "frontendProject": frontendProject,
                            "out": "dist/executables"
                        }
                    };
                }
            });
        });
        return workspaceJson;
    });
}
function addConfigurationFile() {
    let rules = (0, workspace_1.updateWorkspaceInTree)((workspaceJson, context, host) => {
        let workspaceRules = [];
        Object.entries(workspaceJson.projects).forEach(([projectName, project]) => {
            if (project.architect) {
                Object.entries(project.architect).forEach(([targetName, targetConfig]) => {
                    if (targetConfig.builder === 'nx-electron:build') {
                        const project = workspaceJson.projects[projectName];
                        workspaceRules.push(writeConfigurationFile(project.sourceRoot));
                    }
                });
            }
        });
        return workspaceRules;
    });
    return (0, schematics_1.chain)([rules]);
}
function writeConfigurationFile(projectSourceRoot) {
    return (host) => {
        host.overwrite((0, path_1.resolve)(projectSourceRoot, 'app/options/packager.options'), `{
  "$schema": "../../../../../node_modules/nx-electron/src/validation/packager.schema.json"
}
`);
    };
}
function update() {
    return (0, schematics_1.chain)([
        addConfigurations(),
        addConfigurationFile(),
        (0, workspace_1.formatFiles)(),
    ]);
}
exports.default = update;
//# sourceMappingURL=add-packager-config.js.map
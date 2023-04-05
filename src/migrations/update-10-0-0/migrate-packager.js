"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const schematics_1 = require("@angular-devkit/schematics");
const workspace_1 = require("@nrwl/workspace");
function updateConfigurations() {
    return (0, workspace_1.updateWorkspaceInTree)((workspaceJson) => {
        Object.entries(workspaceJson.projects).forEach(([projectName, project]) => {
            if (!project.architect) {
                return;
            }
            Object.entries(project.architect).forEach(([targetName, targetConfig]) => {
                if (targetConfig.builder === 'nx-electron:package') {
                    const architect = workspaceJson.projects[projectName].architect[targetName];
                    if (architect && architect.options) {
                        architect.options.prepackageOnly = true;
                        architect.options.outputPath = architect.options.out || "dist/packages";
                        delete architect.options.out;
                    }
                }
                if (targetConfig.builder === 'nx-electron:make') {
                    const architect = workspaceJson.projects[projectName].architect[targetName];
                    if (architect && architect.options) {
                        architect.options.outputPath = architect.options.out || "dist/executables";
                        delete architect.options.out;
                    }
                }
            });
        });
        return workspaceJson;
    });
}
function update() {
    return (0, schematics_1.chain)([
        updateConfigurations(),
        (0, workspace_1.formatFiles)(),
    ]);
}
exports.default = update;
//# sourceMappingURL=migrate-packager.js.map
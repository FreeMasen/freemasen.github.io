const fs = require("node:fs").promises;

/**
 * @param {{name: string, homepageUrl: string, updatedAt: string}} l side repo
 * @param {{name: string, homepageUrl: string, updatedAt: string}} r side repo
 */
function sorter(l, r) {
    let ldt = new Date(l.updatedAt);
    let rdt = new Date(l.updatedAt);
    return ldt - rdt;
}

(async () => {
    let template = await fs.readFile("./new_index.html", "utf-8")
    let json_str = await fs.readFile("./repos.json", "utf-8");
    let repos = JSON.parse(json_str);
    repos.sort(sorter);
    let list_elements = [];
    for (let repo of repos) {
        list_elements.push(`<li class="site-list-entry" onclick="window.location = ${repo.homepageUrl}">
    <span class="site-title">${repo.name}</span>
    <span class="site-desc">${repo.description}</span>
</li>`)
    }
    return template.replace("{{site-list}}", list_elements.join("\n"));
})().then(console.log).catch(e => console.error("ERROR:", e));

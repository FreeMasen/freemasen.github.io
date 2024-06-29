const fs = require("node:fs").promises;

/**
 * @param {{name: string, homepageUrl: string, updatedAt: string}} l side repo
 * @param {{name: string, homepageUrl: string, updatedAt: string}} r side repo
 */
function sorter(l, r) {
    let ldt = new Date(l.updatedAt);
    let rdt = new Date(l.updatedAt);
    if (l.name.toLowerCase().includes("wiredforge.com")) {
        return -100;
    }
    if (r.name.toLowerCase().includes("wiredforge.com")) {
        return 100;
    }
    return ldt - rdt;
}

async function get_repos() {
    let ret = [];
    for (let path of ["repos.json", "cosock.json", "rusty_ecma.json"]) {
        let json_str = await fs.readFile(path, "utf-8");
        ret.concat(JSON.parse(json_str));
    }
    ret.sort(sorter);
    return ret;
}

(async () => {
    let template = await fs.readFile("./new_index.html", "utf-8")
    let repos = await get_repos();
    console.log("generating with", repos.length);
    let list_elements = [];
    for (let repo of repos) {
        list_elements.push(`<li class="site-list-entry" onclick="window.location = '${repo.homepageUrl}'">
    <span class="site-title">${repo.name}</span>
    <span class="site-desc">${repo.description}</span>
</li>`)
    }
    return template.replace("{{site-list}}", list_elements.join("\n"));
})().then(console.log).catch(e => console.error("ERROR:", e));

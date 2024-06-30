const fs = require("node:fs").promises;
const personal_website = "wiredforge.com";

/**
 * 
 * @param {{name: string, homepageUrl: string, updatedAt: string}} obj 
 * @returns {boolean}
 */
const is_personal_website = (obj) => {
    return obj.name.toLowerCase().includes(personal_website);
}

/**
 * @param {{name: string, homepageUrl: string, updatedAt: string}} l side repo
 * @param {{name: string, homepageUrl: string, updatedAt: string}} r side repo
 */
function sorter(l, r) {
    let ldt = new Date(l.updatedAt);
    let rdt = new Date(l.updatedAt);
    if (is_personal_website(l)) {
        return -100;
    }
    if (is_personal_website(r)) {
        return 100;
    }
    return ldt - rdt;
}

async function get_repos() {
    let ret = [];
    for (let path of ["repos.json", "cosock.json", "rusty_ecma.json"]) {
        let json_str = await fs.readFile(path, "utf-8");
        let json = JSON.parse(json_str);
        console.error("adding ", json.length, "sites");
        ret.push(...json);
    }
    ret.sort(sorter);
    return ret.map(o => {
        if (is_personal_website(o)) {
            o.name = "Freemasen.com";
        }
        return o
    });
}

(async () => {
    let template = await fs.readFile("./new_index.html", "utf-8")
    let repos = await get_repos();
    console.error("generating with", repos.length);
    let list_elements = [];
    for (let repo of repos) {
        list_elements.push(`<li class="site-list-entry">
    <a class="site-source" href="${repo.url}">
            <image src="/github-logo.svg" />
    </a>
    <a class="repo-homepage" href="${repo.homepageUrl}">
        <span class="site-title">${repo.name}</span>
        <span class="site-desc">${repo.description}</span>
    </a>
</li>`)
    }
    return template.replace("{{site-list}}", list_elements.join("\n"));
})().then(console.log).catch(e => console.error("ERROR:", e));

const fs = require("fs");
const path = require("path");
const matter = require("gray-matter");

function postData() {
  const files = fs.readdirSync(path.join("src/pages/posts"));
  console.log(files);
  const posts = files.map((filename) => {
    const slug = filename.replace(".md", "");

    const markdownWithMeta = fs.readFileSync(
      path.join("src/pages/posts", filename),
      "utf-8"
    );

    const { data: frontmatter } = matter(markdownWithMeta);

    return {
      slug,
      frontmatter,
    };
  });
  console.log(posts);
  return `export const posts = ${JSON.stringify(posts)}`;
}

try {
  fs.readdirSync("src/cache");
} catch (error) {
  fs.mkdirSync("src/cache");
}

fs.writeFile("src/cache/data.js", postData(), function (err) {
  if (err) return console.log(err);
  console.log("Posts Cached...");
});

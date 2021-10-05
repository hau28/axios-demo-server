var express = require("express");
var router = express.Router();
var auth = require("../middlewares/auth");

const fakePosts = [
  {
    id: "1",
    permission: "User",
    title: "User post 1",
    body: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Morbi tincidunt ornare massa eget egestas purus viverra accumsan. Sit amet nulla facilisi morbi tempus iaculis urna id.",
  },
  {
    id: "2",
    permission: "User",
    title: "User post 2",
    body: "Tempus iaculis urna id volutpat lacus laoreet non. At augue eget arcu dictum. Suspendisse in est ante in nibh mauris cursus mattis molestie. Sem viverra aliquet eget sit amet. Nisi vitae suscipit tellus mauris a diam maecenas sed.",
  },
  {
    id: "3",
    permission: "User",
    title: "User post 3",
    body: "Nam at lectus urna duis convallis convallis. Tellus in hac habitasse platea dictumst vestibulum rhoncus est. Sit amet aliquam id diam maecenas ultricies. Urna porttitor rhoncus dolor purus. Tincidunt dui ut ornare lectus.",
  },
  {
    id: "4",
    permission: "Admin",
    title: "Admin post 1",
    body: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Morbi tincidunt ornare massa eget egestas purus viverra accumsan. Sit amet nulla facilisi morbi tempus iaculis urna id.",
  },
  {
    id: "5",
    permission: "Admin",
    title: "Admin post 2",
    body: "Tempus iaculis urna id volutpat lacus laoreet non. At augue eget arcu dictum. Suspendisse in est ante in nibh mauris cursus mattis molestie. Sem viverra aliquet eget sit amet. Nisi vitae suscipit tellus mauris a diam maecenas sed.",
  },
  {
    id: "6",
    permission: "Admin",
    title: "Admin post 3",
    body: "Nam at lectus urna duis convallis convallis. Tellus in hac habitasse platea dictumst vestibulum rhoncus est. Sit amet aliquam id diam maecenas ultricies. Urna porttitor rhoncus dolor purus. Tincidunt dui ut ornare lectus.",
  },
];

router.get("/list", auth, async function (req, res) {
  try {
    // FAKE SERVER DELAY
    await new Promise((r) => {
      setTimeout(r, 1500);
    });
    const previews = fakePosts.map((post) => ({
      id: post.id,
      permission: post.permission,
      title: post.title,
    }));
    res.status(200).json(previews);
  } catch (error) {
    res.status(500).json({
      name: error.name,
      message: error.message,
    });
  }
});

router.get("/view/:id", auth, async function (req, res) {
  const { id } = req.params;
  try {
    if (isNaN(id))
      return res.status(400).json({
        name: "BadRequest",
        message: "Bad id format, make sure post id a number",
      });

    // FAKE SERVER DELAY
    await new Promise((r) => {
      setTimeout(r, 1500);
    });

    const post = fakePosts.find((c) => c.id === id);

    if (!post)
      return res.status(404).json({
        name: "NotFound",
        message: `There's no post with id "${id}"`,
      });

    if (post.permission === "Admin" && req?.auth?.role !== "admin")
      return res.status(403).json({
        name: "ForbiddenError",
        message: "You don't have permission to access this content",
      });

    res.status(200).json(post);
  } catch (error) {
    res.status(500).json({
      name: error.name,
      message: error.message,
    });
  }
});

router.put("/edit/:id", auth, async function (req, res) {
  // FAKE SERVER DELAY
  await new Promise((r) => {
    setTimeout(r, 1500);
  });
  return res.status(204).send();
});

router.delete("/delete/:id", auth, async function (req, res) {
  // FAKE SERVER DELAY
  await new Promise((r) => {
    setTimeout(r, 1500);
  });
  return res.status(204).send();
});

module.exports = router;

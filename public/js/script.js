function deletePost(postId) {
	fetch(`/dashboard/delete/${postId}`, {
		method: "DELETE",
		headers: {
			"Content-Type": "application/json",
		},
	})
		.then((res) => {
			if (res.ok) {
				return res.json();
			} else {
				throw new Error("Failed to delete post");
			}
		})
		.then(() => {
			window.location.href = "/dashboard";
		})
		.catch((error) => {
			console.error("Error:", error);
		});
}
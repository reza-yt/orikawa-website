import { list, put, del } from '@vercel/blob';

// Generic blob helpers for JSON data
async function getJSON<T>(filename: string): Promise<T[]> {
  try {
    const { blobs } = await list({ prefix: `data/${filename}/` });
    if (blobs.length === 0) return [];
    // Get the latest version
    const latest = blobs.sort((a, b) => 
      new Date(b.uploadedAt).getTime() - new Date(a.uploadedAt).getTime()
    )[0];
    const res = await fetch(latest.url);
    return await res.json();
  } catch {
    return [];
  }
}

async function setJSON(filename: string, data: any): Promise<void> {
  const key = `data/${filename}/${Date.now()}.json`;
  await put(key, JSON.stringify(data, null, 2), {
    access: 'public',
    contentType: 'application/json',
  });
}

// Posts
export async function getPosts() { return getJSON<any>('posts'); }
export async function getPost(id: string) {
  const posts = await getPosts();
  return posts.find((p: any) => p.id === id);
}
export async function createPost(post: any) {
  const posts = await getPosts();
  post.id = Date.now().toString();
  post.createdAt = new Date().toISOString();
  posts.push(post);
  await setJSON('posts', posts);
  return post;
}
export async function updatePost(id: string, data: any) {
  const posts = await getPosts();
  const idx = posts.findIndex((p: any) => p.id === id);
  if (idx === -1) return null;
  posts[idx] = { ...posts[idx], ...data, updatedAt: new Date().toISOString() };
  await setJSON('posts', posts);
  return posts[idx];
}
export async function deletePost(id: string) {
  const posts = (await getPosts()).filter((p: any) => p.id !== id);
  await setJSON('posts', posts);
}

// Products
export async function getProducts() { return getJSON<any>('products'); }
export async function getProduct(id: string) {
  const products = await getProducts();
  return products.find((p: any) => p.id === id);
}
export async function createProduct(product: any) {
  const products = await getProducts();
  product.id = Date.now().toString();
  product.createdAt = new Date().toISOString();
  products.push(product);
  await setJSON('products', products);
  return product;
}
export async function updateProduct(id: string, data: any) {
  const products = await getProducts();
  const idx = products.findIndex((p: any) => p.id === id);
  if (idx === -1) return null;
  products[idx] = { ...products[idx], ...data, updatedAt: new Date().toISOString() };
  await setJSON('products', products);
  return products[idx];
}
export async function deleteProduct(id: string) {
  const products = (await getProducts()).filter((p: any) => p.id !== id);
  await setJSON('products', products);
}

// Projects
export async function getProjects() { return getJSON<any>('projects'); }
export async function getProject(id: string) {
  const projects = await getProjects();
  return projects.find((p: any) => p.id === id);
}
export async function createProject(project: any) {
  const projects = await getProjects();
  project.id = Date.now().toString();
  project.createdAt = new Date().toISOString();
  projects.push(project);
  await setJSON('projects', projects);
  return project;
}
export async function updateProject(id: string, data: any) {
  const projects = await getProjects();
  const idx = projects.findIndex((p: any) => p.id === id);
  if (idx === -1) return null;
  projects[idx] = { ...projects[idx], ...data, updatedAt: new Date().toISOString() };
  await setJSON('projects', projects);
  return projects[idx];
}
export async function deleteProject(id: string) {
  const projects = (await getProjects()).filter((p: any) => p.id !== id);
  await setJSON('projects', projects);
}

// Config
export async function getConfig() {
  const configs = await getJSON<any>('config');
  if (configs.length > 0) return configs[configs.length - 1];
  // Seed default config
  const defaultConfig = {
    admin: { username: 'admin', password: 'orikawa2024' },
    site: { name: 'Orikawa Indonesia', description: 'Specialist Scaling Chiller & Chemical Cleaning' }
  };
  await setJSON('config', defaultConfig);
  return defaultConfig;
}
export async function updateConfig(data: any) {
  await setJSON('config', data);
}

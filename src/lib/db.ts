import fs from 'fs';
import path from 'path';

const dataDir = path.join(process.cwd(), 'data');

function readJSON(file: string) {
  const filePath = path.join(dataDir, file);
  if (!fs.existsSync(filePath)) return [];
  return JSON.parse(fs.readFileSync(filePath, 'utf8'));
}

function writeJSON(file: string, data: any) {
  const filePath = path.join(dataDir, file);
  fs.writeFileSync(filePath, JSON.stringify(data, null, 2));
}

// Posts
export function getPosts() { return readJSON('posts.json'); }
export function getPost(id: string) { return getPosts().find((p: any) => p.id === id); }
export function createPost(post: any) {
  const posts = getPosts();
  post.id = Date.now().toString();
  post.createdAt = new Date().toISOString();
  posts.push(post);
  writeJSON('posts.json', posts);
  return post;
}
export function updatePost(id: string, data: any) {
  const posts = getPosts();
  const idx = posts.findIndex((p: any) => p.id === id);
  if (idx === -1) return null;
  posts[idx] = { ...posts[idx], ...data, updatedAt: new Date().toISOString() };
  writeJSON('posts.json', posts);
  return posts[idx];
}
export function deletePost(id: string) {
  const posts = getPosts().filter((p: any) => p.id !== id);
  writeJSON('posts.json', posts);
}

// Products
export function getProducts() { return readJSON('products.json'); }
export function getProduct(id: string) { return getProducts().find((p: any) => p.id === id); }
export function createProduct(product: any) {
  const products = getProducts();
  product.id = Date.now().toString();
  product.createdAt = new Date().toISOString();
  products.push(product);
  writeJSON('products.json', products);
  return product;
}
export function updateProduct(id: string, data: any) {
  const products = getProducts();
  const idx = products.findIndex((p: any) => p.id === id);
  if (idx === -1) return null;
  products[idx] = { ...products[idx], ...data, updatedAt: new Date().toISOString() };
  writeJSON('products.json', products);
  return products[idx];
}
export function deleteProduct(id: string) {
  const products = getProducts().filter((p: any) => p.id !== id);
  writeJSON('products.json', products);
}

// Projects
export function getProjects() { return readJSON('projects.json'); }
export function getProject(id: string) { return getProjects().find((p: any) => p.id === id); }
export function createProject(project: any) {
  const projects = getProjects();
  project.id = Date.now().toString();
  project.createdAt = new Date().toISOString();
  projects.push(project);
  writeJSON('projects.json', projects);
  return project;
}
export function updateProject(id: string, data: any) {
  const projects = getProjects();
  const idx = projects.findIndex((p: any) => p.id === id);
  if (idx === -1) return null;
  projects[idx] = { ...projects[idx], ...data, updatedAt: new Date().toISOString() };
  writeJSON('projects.json', projects);
  return projects[idx];
}
export function deleteProject(id: string) {
  const projects = getProjects().filter((p: any) => p.id !== id);
  writeJSON('projects.json', projects);
}

// Config
export function getConfig() { return readJSON('config.json'); }
export function updateConfig(data: any) { writeJSON('config.json', data); }

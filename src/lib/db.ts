import { kv } from '@vercel/kv';

// Generic KV helpers
async function getList<T>(key: string): Promise<T[]> {
  try {
    const data = await kv.get<T[]>(key);
    return data || [];
  } catch {
    return [];
  }
}

async function setList<T>(key: string, data: T[]): Promise<void> {
  await kv.set(key, data);
}

// Posts
export async function getPosts() { return getList<any>('posts'); }
export async function getPost(id: string) {
  const posts = await getPosts();
  return posts.find((p: any) => p.id === id);
}
export async function createPost(post: any) {
  const posts = await getPosts();
  post.id = Date.now().toString();
  post.createdAt = new Date().toISOString();
  posts.push(post);
  await setList('posts', posts);
  return post;
}
export async function updatePost(id: string, data: any) {
  const posts = await getPosts();
  const idx = posts.findIndex((p: any) => p.id === id);
  if (idx === -1) return null;
  posts[idx] = { ...posts[idx], ...data, updatedAt: new Date().toISOString() };
  await setList('posts', posts);
  return posts[idx];
}
export async function deletePost(id: string) {
  const posts = (await getPosts()).filter((p: any) => p.id !== id);
  await setList('posts', posts);
}

// Products
export async function getProducts() { return getList<any>('products'); }
export async function getProduct(id: string) {
  const products = await getProducts();
  return products.find((p: any) => p.id === id);
}
export async function createProduct(product: any) {
  const products = await getProducts();
  product.id = Date.now().toString();
  product.createdAt = new Date().toISOString();
  products.push(product);
  await setList('products', products);
  return product;
}
export async function updateProduct(id: string, data: any) {
  const products = await getProducts();
  const idx = products.findIndex((p: any) => p.id === id);
  if (idx === -1) return null;
  products[idx] = { ...products[idx], ...data, updatedAt: new Date().toISOString() };
  await setList('products', products);
  return products[idx];
}
export async function deleteProduct(id: string) {
  const products = (await getProducts()).filter((p: any) => p.id !== id);
  await setList('products', products);
}

// Projects
export async function getProjects() { return getList<any>('projects'); }
export async function getProject(id: string) {
  const projects = await getProjects();
  return projects.find((p: any) => p.id === id);
}
export async function createProject(project: any) {
  const projects = await getProjects();
  project.id = Date.now().toString();
  project.createdAt = new Date().toISOString();
  projects.push(project);
  await setList('projects', projects);
  return project;
}
export async function updateProject(id: string, data: any) {
  const projects = await getProjects();
  const idx = projects.findIndex((p: any) => p.id === id);
  if (idx === -1) return null;
  projects[idx] = { ...projects[idx], ...data, updatedAt: new Date().toISOString() };
  await setList('projects', projects);
  return projects[idx];
}
export async function deleteProject(id: string) {
  const projects = (await getProjects()).filter((p: any) => p.id !== id);
  await setList('projects', projects);
}

// Config
export async function getConfig() {
  const config = await kv.get<any>('config');
  // Seed from local JSON on first run
  if (!config) {
    try {
      const fs = await import('fs');
      const path = await import('path');
      const filePath = path.join(process.cwd(), 'data', 'config.json');
      if (fs.existsSync(filePath)) {
        const seed = JSON.parse(fs.readFileSync(filePath, 'utf8'));
        await kv.set('config', seed);
        return seed;
      }
    } catch {}
    return {
      admin: { username: 'admin', password: 'orikawa2024' },
      site: { name: 'Orikawa Indonesia', description: 'Specialist Scaling Chiller & Chemical Cleaning' }
    };
  }
  return config;
}
export async function updateConfig(data: any) {
  await kv.set('config', data);
}
